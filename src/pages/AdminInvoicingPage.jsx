import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Edit3, Printer, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { useReactToPrint } from 'react-to-print';
import ServiceOrderToPrint from '@/components/common/ServiceOrderToPrint';

const AdminInvoicingPage = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orderToPrint, setOrderToPrint] = useState(null);

  const printComponentRef = useRef();

  const generateOrderNumber = () => {
    const prefix = "MT-";
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}${randomNumber}`;
  };
  
  const initialOrderState = {
    id: '',
    orderNumber: generateOrderNumber(),
    clientName: '',
    clientDNI: '',
    date: new Date().toISOString().slice(0, 10),
    equipmentDetails: '',
    reportedFault: '',
    devicePassword: '',
    estimatedBudget: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    totalAmount: '0.00',
  };


  useEffect(() => {
    const storedOrders = localStorage.getItem('serviceOrders');
    if (storedOrders) {
      setServiceOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('serviceOrders', JSON.stringify(serviceOrders));
  }, [serviceOrders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...currentOrder.items];
    newItems[index][name] = value;
    if (name === 'quantity' || name === 'price') {
        newItems[index][name] = parseFloat(value) || 0;
    }
    setCurrentOrder(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setCurrentOrder(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    const newItems = currentOrder.items.filter((_, i) => i !== index);
    setCurrentOrder(prev => ({ ...prev, items: newItems }));
  };

  const calculateTotal = () => {
    if (!currentOrder || !currentOrder.items) return '0.00';
    const total = currentOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return total.toFixed(2);
  };
  
  useEffect(() => {
    if (isModalOpen && currentOrder) {
        setCurrentOrder(prev => ({ ...prev, totalAmount: calculateTotal(), estimatedBudget: calculateTotal() }));
    }
  }, [currentOrder?.items, isModalOpen]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentOrder.clientName || !currentOrder.clientDNI || !currentOrder.reportedFault || currentOrder.items.some(item => !item.description || item.quantity <= 0 || item.price < 0)) {
        toast({
            title: "Error de Validación",
            description: "Por favor, completa todos los campos obligatorios: Nombre Cliente, DNI, Falla Reportada y detalles de ítems.",
            variant: "destructive",
        });
        return;
    }
    
    const finalOrder = { ...currentOrder, totalAmount: calculateTotal(), estimatedBudget: calculateTotal() };

    if (isEditing) {
      setServiceOrders(serviceOrders.map(ord => ord.id === finalOrder.id ? finalOrder : ord));
      toast({ title: "Orden Actualizada", description: `Orden para ${finalOrder.clientName} actualizada.` });
    } else {
      setServiceOrders([...serviceOrders, { ...finalOrder, id: uuidv4(), orderNumber: finalOrder.orderNumber || generateOrderNumber() }]);
      toast({ title: "Orden Creada", description: `Nueva orden para ${finalOrder.clientName} creada.` });
    }
    closeModal();
  };

  const openModal = (orderToEdit = null) => {
    if (orderToEdit) {
      setCurrentOrder(orderToEdit);
      setIsEditing(true);
    } else {
      setCurrentOrder(initialOrderState);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
    setIsEditing(false);
  };

  const deleteOrder = (id) => {
    setServiceOrders(serviceOrders.filter(ord => ord.id !== id));
    toast({ title: "Orden Eliminada", description: "La orden de servicio ha sido eliminada." });
  };
  
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => setOrderToPrint(null),
  });

  const triggerPrint = (order) => {
    setOrderToPrint(order);
    setTimeout(() => { // Ensure state is updated before printing
        handlePrint();
    }, 0);
  };

  const viewOrder = (order) => {
    triggerPrint(order);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Gestión de Órdenes de Servicio</h1>
          <Button onClick={() => openModal()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <PlusCircle className="mr-2 h-5 w-5" /> Nueva Orden
          </Button>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Orden</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceOrders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No hay órdenes registradas. ¡Crea una nueva!
                    </td>
                  </tr>
                )}
                {serviceOrders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(order.estimatedBudget).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => viewOrder(order)} className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-5 w-5" />
                      </Button>
                       <Button variant="ghost" size="icon" onClick={() => triggerPrint(order)} className="text-green-600 hover:text-green-800">
                        <Printer className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openModal(order)} className="text-yellow-500 hover:text-yellow-700">
                        <Edit3 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteOrder(order.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold gradient-text">{isEditing ? 'Editar Orden de Servicio' : 'Nueva Orden de Servicio'}</h2>
                <span className="text-sm text-gray-500">Nº Orden: {currentOrder.orderNumber}</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="clientName">Nombre del Cliente <span className="text-red-500">*</span></Label>
                  <Input id="clientName" name="clientName" value={currentOrder.clientName} onChange={handleInputChange} required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="clientDNI">DNI del Cliente <span className="text-red-500">*</span></Label>
                  <Input id="clientDNI" name="clientDNI" value={currentOrder.clientDNI} onChange={handleInputChange} required className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="date">Fecha <span className="text-red-500">*</span></Label>
                <Input type="date" id="date" name="date" value={currentOrder.date} onChange={handleInputChange} required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="equipmentDetails">Detalles del Equipo</Label>
                <Input id="equipmentDetails" name="equipmentDetails" value={currentOrder.equipmentDetails} onChange={handleInputChange} className="mt-1" placeholder="Ej: iPhone 12, Samsung Galaxy S21"/>
              </div>

              <div>
                <Label htmlFor="reportedFault">Falla Reportada <span className="text-red-500">*</span></Label>
                <Textarea id="reportedFault" name="reportedFault" value={currentOrder.reportedFault} onChange={handleInputChange} required className="mt-1" placeholder="Describa el problema del equipo..."/>
              </div>

              <div>
                <Label htmlFor="devicePassword">Contraseña o Patrón del Celular</Label>
                <Input id="devicePassword" name="devicePassword" value={currentOrder.devicePassword} onChange={handleInputChange} className="mt-1" placeholder="Si aplica"/>
              </div>
              
              <h3 className="text-lg font-semibold pt-2 border-t mt-4">Ítems del Presupuesto / Servicio</h3>
              {currentOrder.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 sm:gap-4 items-end border p-3 sm:p-4 rounded-md">
                  <div className="col-span-12 sm:col-span-5">
                    <Label htmlFor={`itemDescription-${index}`}>Descripción <span className="text-red-500">*</span></Label>
                    <Input id={`itemDescription-${index}`} name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} required className="mt-1" />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <Label htmlFor={`itemQuantity-${index}`}>Cant. <span className="text-red-500">*</span></Label>
                    <Input type="number" id={`itemQuantity-${index}`} name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required min="1" className="mt-1" />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <Label htmlFor={`itemPrice-${index}`}>Precio Unit. <span className="text-red-500">*</span></Label>
                    <Input type="number" id={`itemPrice-${index}`} name="price" value={item.price} onChange={(e) => handleItemChange(index, e)} required min="0" step="0.01" className="mt-1" />
                  </div>
                   <div className="col-span-3 sm:col-span-2 flex justify-end items-center pt-5">
                    {currentOrder.items.length > 1 && (
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addItem} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Ítem
              </Button>

              <div className="text-right font-bold text-xl mt-4 sm:mt-6">
                Presupuesto Total: ${currentOrder.totalAmount}
              </div>
              <Input type="hidden" name="estimatedBudget" value={currentOrder.totalAmount} />


              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t">
                <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">{isEditing ? 'Guardar Cambios' : 'Crear Orden'}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      <div className="hidden">
        {orderToPrint && <ServiceOrderToPrint ref={printComponentRef} order={orderToPrint} />}
      </div>
    </div>
  );
};

export default AdminInvoicingPage;