import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, MapPin, CreditCard, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";



const ClientDashboardPage = () => {
  const [clientData, setClientData] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const { toast } = useToast();

  useEffect(() => {
    const storedUserEmail = JSON.parse(localStorage.getItem('clientUser'))?.email;
    if (storedUserEmail) {
      const allUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
      const currentUserData = allUsers.find(user => user.email === storedUserEmail);
      if (currentUserData) {
        // Simular algunas órdenes/facturas
        const simulatedOrders = [
          { id: 'ORD-001', date: '2025-05-20', item: 'Reparación Pantalla iPhone 12', status: 'Completado', total: '$120.00' },
          { id: 'ORD-002', date: '2025-06-01', item: 'Cambio Batería Samsung S21', status: 'En Proceso', total: '$80.00' },
          { id: 'ORD-003', date: '2025-06-05', item: 'Compra Funda + Templado', status: 'Entregado', total: '$35.00' },
        ];
        const fullUserData = {
          ...currentUserData,
          orders: currentUserData.orders && currentUserData.orders.length > 0 ? currentUserData.orders : simulatedOrders,
          personalInfo: currentUserData.personalInfo || { address: 'Calle Falsa 123, Ciudad', phone: '3101234567' }
        };
        setClientData(fullUserData);
        setEditedInfo({ 
          name: fullUserData.name, 
          email: fullUserData.email,
          phone: fullUserData.personalInfo.phone || '',
          address: fullUserData.personalInfo.address || ''
        });
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    const allUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
    const userIndex = allUsers.findIndex(user => user.email === clientData.email);
    if (userIndex !== -1) {
      allUsers[userIndex].name = editedInfo.name;
      // No permitir cambiar email para evitar problemas de login con localStorage
      // allUsers[userIndex].email = editedInfo.email; 
      allUsers[userIndex].personalInfo = {
        phone: editedInfo.phone,
        address: editedInfo.address
      };
      localStorage.setItem('clientUsers', JSON.stringify(allUsers));
      setClientData(prev => ({
        ...prev, 
        name: editedInfo.name, 
        personalInfo: { phone: editedInfo.phone, address: editedInfo.address}
      }));
      // Actualizar el clientUser en localStorage si el nombre cambió
      const clientUser = JSON.parse(localStorage.getItem('clientUser'));
      if (clientUser && clientUser.name !== editedInfo.name) {
        localStorage.setItem('clientUser', JSON.stringify({...clientUser, name: editedInfo.name}));
      }

      toast({ title: "Información Actualizada", description: "Tus datos personales han sido guardados." });
    } else {
      toast({ title: "Error", description: "No se pudo guardar la información.", variant: "destructive" });
    }
    setIsEditingInfo(false);
  };


  if (!clientData) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-80px)]"><p className="text-xl text-muted-foreground">Cargando datos del cliente...</p></div>;
  }

  const paymentMethods = [
    { name: 'Efectivo en Local', icon: '💵' },
    { name: 'Tarjetas de Crédito/Débito', icon: '💳', details: 'Visa, Mastercard, Amex' },
    { name: 'Transferencia Bancaria', icon: '🏦' },
    { name: 'Billeteras Virtuales', icon: '📱', details: 'Mercado Pago, Ualá' }
  ];

  const locationInfo = {
    address: '9 de Julio 1357,5500 Mendoza',
    mapLink: '<iframe src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3350.392097012384!2d-68.8448!3d-32.8878!3m2!1i1024!2i768!4f13.1!2m1!1s9%20de%20Julio%201357%20local%209%2C%20Ciudad%2C%20(5500)%20Mendoza!5e0!3m2!1ses!2sar!4v1749496467087!5m2!1ses!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    hours: 'Lunes a Viernes: 9am - 13am & 4pm - 7pm | Sábados: 10am - 2pm | Domingo: Cerrado'
   
  };

  const SectionCard = ({ title, icon: Icon, children, delay = 0.2 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-6 rounded-xl shadow-lg dark:border dark:border-slate-700"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-7 h-7 text-primary mr-3" />
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-800 dark:to-slate-900 text-foreground">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Panel de Cliente</h1>
          <p className="text-xl text-muted-foreground mt-2">Bienvenido, {clientData.name}. Aquí puedes gestionar tu información.</p>
        </motion.div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 gap-2 bg-card dark:bg-slate-800 p-2 rounded-lg">
            <TabsTrigger value="info" className="py-2.5">Mis Datos</TabsTrigger>
            <TabsTrigger value="orders" className="py-2.5">Mis Órdenes</TabsTrigger>
            <TabsTrigger value="location" className="py-2.5">Ubicación</TabsTrigger>
            <TabsTrigger value="payments" className="py-2.5">Medios de Pago</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <SectionCard title="Información Personal" icon={User}>
              {!isEditingInfo ? (
                <>
                  <p className="mb-2"><strong className="font-medium">Nombre:</strong> {clientData.name}</p>
                  <p className="mb-2"><strong className="font-medium">Email:</strong> {clientData.email}</p>
                  <p className="mb-2"><strong className="font-medium">Teléfono:</strong> {clientData.personalInfo?.phone || 'No especificado'}</p>
                  <p className="mb-4"><strong className="font-medium">Dirección:</strong> {clientData.personalInfo?.address || 'No especificada'}</p>
                  <Button onClick={() => setIsEditingInfo(true)} className="mt-2">
                    <Edit3 className="w-4 h-4 mr-2"/> Editar Información
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" name="name" value={editedInfo.name} onChange={handleInputChange} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="email">Email (no editable)</Label>
                    <Input type="email" id="email" name="email" value={editedInfo.email} disabled className="mt-1 bg-muted/50"/>
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input type="tel" id="phone" name="phone" value={editedInfo.phone} onChange={handleInputChange} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input type="text" id="address" name="address" value={editedInfo.address} onChange={handleInputChange} className="mt-1"/>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <Button onClick={handleSaveInfo} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2"/> Guardar Cambios
                    </Button>
                    <Button variant="outline" onClick={() => { setIsEditingInfo(false); setEditedInfo({name: clientData.name, email: clientData.email, phone: clientData.personalInfo.phone, address: clientData.personalInfo.address });}}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="orders">
            <SectionCard title="Mis Facturas y Órdenes" icon={FileText} delay={0.3}>
              {clientData.orders && clientData.orders.length > 0 ? (
                <div className="space-y-4">
                  {clientData.orders.map(order => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="p-4 border border-border rounded-lg bg-background/30 dark:bg-slate-800/50"
                    >
                      <h3 className="font-semibold text-lg text-primary">{order.id} - {order.item}</h3>
                      <p className="text-sm text-muted-foreground">Fecha: {order.date}</p>
                      <p className="text-sm">Estado: <span className={`font-medium ${order.status === 'Completado' || order.status === 'Entregado' ? 'text-green-500' : order.status === 'En Proceso' ? 'text-yellow-500' : 'text-red-500'}`}>{order.status}</span></p>
                      <p className="text-md font-semibold mt-1">Total: {order.total}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No tienes órdenes o facturas registradas aún.</p>
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="location">
             <SectionCard title="Ubicación del Local" icon={MapPin} delay={0.4}>
              <p className="mb-2 text-lg">{locationInfo.address}</p>
              <p className="text-muted-foreground mb-4">{locationInfo.hours}</p>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-118.2537%2C34.0422%2C-118.2337%2C34.0622&amp;layer=mapnik&amp;marker=34.0522%2C-118.2437"
                  className="w-full h-full border-0"
                  title="Mapa del Local"
                  loading="lazy"
                ></iframe>
              </div>
              <a href={locationInfo.mapLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Ver en mapa grande
              </a>
            </SectionCard>
          </TabsContent>

          <TabsContent value="payments">
            <SectionCard title="Medios de Pago Disponibles" icon={CreditCard} delay={0.5}>
              <ul className="space-y-3">
                {paymentMethods.map(method => (
                  <li key={method.name} className="flex items-start p-3 bg-background/30 dark:bg-slate-800/50 rounded-md">
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      {method.details && <p className="text-sm text-muted-foreground">{method.details}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboardPage;