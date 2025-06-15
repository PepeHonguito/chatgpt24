import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Edit3, Settings, ListChecks, Watch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const AdminTechnicalServicesPage = () => {
  const [technicalServices, setTechnicalServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialServiceState = {
    id: '',
    serviceName: '', // Nombre del servicio (ej: Cambio de pantalla)
    price: '', // Precio del servicio
    estimatedDuration: '', // Duración estimada (ej: 2 horas, 1 día)
    equipmentName: '', // Nombre del equipo (ej: iPhone X)
    repairActions: '', // Acciones de reparación tomadas
    technicianNotes: '', // Notas del técnico
    status: 'Pendiente', // Pendiente, En Progreso, Completado
    creationDate: new Date().toISOString().slice(0,10),
    completionDate: null,
    lastUpdated: new Date().toISOString()
  };

  useEffect(() => {
    const storedServices = localStorage.getItem('technicalServices');
    if (storedServices) {
      setTechnicalServices(JSON.parse(storedServices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('technicalServices', JSON.stringify(technicalServices));
  }, [technicalServices]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService(prev => ({ ...prev, [name]: value, lastUpdated: new Date().toISOString() }));
     if (name === 'status' && value === 'Completado' && !currentService.completionDate) {
        setCurrentService(prev => ({ ...prev, completionDate: new Date().toISOString().slice(0,10)}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentService.serviceName || !currentService.equipmentName || !currentService.price || !currentService.estimatedDuration) {
        toast({
            title: "Error de Validación",
            description: "Por favor, completa los campos: Nombre del Servicio, Nombre del Equipo, Precio y Duración Estimada.",
            variant: "destructive",
        });
        return;
    }
    
    const finalService = {...currentService, lastUpdated: new Date().toISOString()};

    if (isEditing) {
      setTechnicalServices(technicalServices.map(serv => serv.id === finalService.id ? finalService : serv));
      toast({ title: "Servicio Actualizado", description: `Servicio "${finalService.serviceName}" actualizado.` });
    } else {
      setTechnicalServices([{ ...finalService, id: uuidv4() }, ...technicalServices]);
      toast({ title: "Servicio Creado", description: `Nuevo servicio "${finalService.serviceName}" creado.` });
    }
    closeModal();
  };

  const openModal = (serviceToEdit = null) => {
    if (serviceToEdit) {
      setCurrentService(serviceToEdit);
      setIsEditing(true);
    } else {
      setCurrentService(initialServiceState);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
    setIsEditing(false);
  };

  const deleteService = (id) => {
    setTechnicalServices(technicalServices.filter(serv => serv.id !== id));
    toast({ title: "Servicio Eliminado", description: "El servicio técnico ha sido eliminado." });
  };

  const statusColors = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'En Progreso': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold gradient-text">Gestión de Servicios Técnicos</h1>
          <Button onClick={() => openModal()} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> Registrar Servicio
          </Button>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración Est.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {technicalServices.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No hay servicios técnicos registrados.
                    </td>
                  </tr>
                )}
                {technicalServices.map((service) => (
                  <motion.tr 
                    key={service.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.equipmentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${parseFloat(service.price).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.estimatedDuration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[service.status] || 'bg-gray-100 text-gray-800'}`}>
                            {service.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => openModal(service)} className="text-yellow-500 hover:text-yellow-700">
                        <Edit3 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)} className="text-red-600 hover:text-red-800">
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

      {isModalOpen && currentService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">{isEditing ? 'Editar Servicio Técnico' : 'Registrar Nuevo Servicio Técnico'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="serviceName">Nombre del Servicio <span className="text-red-500">*</span></Label>
                  <Input id="serviceName" name="serviceName" value={currentService.serviceName} onChange={handleInputChange} required className="mt-1" placeholder="Ej: Cambio de Batería"/>
                </div>
                <div>
                  <Label htmlFor="equipmentName">Nombre del Equipo <span className="text-red-500">*</span></Label>
                  <Input id="equipmentName" name="equipmentName" value={currentService.equipmentName} onChange={handleInputChange} required className="mt-1" placeholder="Ej: Samsung A52"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="price">Precio del Servicio <span className="text-red-500">*</span></Label>
                  <Input type="number" id="price" name="price" value={currentService.price} onChange={handleInputChange} required min="0" step="0.01" className="mt-1" placeholder="Ej: 50.00"/>
                </div>
                <div>
                  <Label htmlFor="estimatedDuration">Duración Estimada <span className="text-red-500">*</span></Label>
                  <Input id="estimatedDuration" name="estimatedDuration" value={currentService.estimatedDuration} onChange={handleInputChange} required className="mt-1" placeholder="Ej: 2 horas, 1-2 días"/>
                </div>
              </div>
              
              <div>
                <Label htmlFor="repairActions">Acciones de Reparación Realizadas</Label>
                <Textarea id="repairActions" name="repairActions" value={currentService.repairActions} onChange={handleInputChange} className="mt-1" placeholder="Detalle las acciones tomadas..."/>
              </div>
              
              <div>
                <Label htmlFor="technicianNotes">Notas Adicionales del Técnico</Label>
                <Textarea id="technicianNotes" name="technicianNotes" value={currentService.technicianNotes} onChange={handleInputChange} className="mt-1" placeholder="Observaciones, recomendaciones..."/>
              </div>

               <div>
                <Label htmlFor="status">Estado del Servicio</Label>
                <select 
                    id="status" 
                    name="status" 
                    value={currentService.status} 
                    onChange={handleInputChange} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option>Pendiente</option>
                    <option>En Progreso</option>
                    <option>Completado</option>
                </select>
              </div>
              {currentService.status === 'Completado' && (
                <div>
                    <Label htmlFor="completionDate">Fecha de Finalización</Label>
                    <Input type="date" id="completionDate" name="completionDate" value={currentService.completionDate || new Date().toISOString().slice(0,10)} onChange={handleInputChange} className="mt-1" />
                </div>
              )}


              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t">
                <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                <Button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">{isEditing ? 'Guardar Cambios' : 'Registrar Servicio'}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTechnicalServicesPage;