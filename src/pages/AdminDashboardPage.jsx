import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Wrench, Activity, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, change, icon, color, changeColor }) => (
  <motion.div 
    className="bg-white p-6 rounded-xl shadow-lg card-hover flex flex-col justify-between"
    whileHover={{ y: -5 }}
  >
    <div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
    {change && (
      <p className={`text-sm mt-2 ${changeColor}`}>
        {change}
      </p>
    )}
  </motion.div>
);

const RecentActivityItem = ({ text, time }) => (
  <li className="flex items-start space-x-3 py-3">
    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
    <div>
      <p className="text-sm text-gray-700">{text}</p>
      {time && <p className="text-xs text-gray-400">{time}</p>}
    </div>
  </li>
);

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSalesMonth: 0,
    salesChange: 0,
    pendingRepairs: 0,
    repairsCompletedToday: 0,
    newClients: 0,
    newClientsChange: 0,
    recentActivities: []
  });
  const handleLogout = () => {
  localStorage.removeItem('isAdminAuthenticated');
  localStorage.removeItem('adminUser');
  window.location.href = '/empresa/login'; // Redirige al login
  };

  useEffect(() => {
    const serviceOrders = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
    const technicalServices = JSON.parse(localStorage.getItem('technicalServices') || '[]');

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlySales = serviceOrders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      })
      .reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthSales = serviceOrders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === previousMonthYear;
      })
      .reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);
    
    let salesChangePercentage = 0;
    if (previousMonthSales > 0) {
      salesChangePercentage = ((monthlySales - previousMonthSales) / previousMonthSales) * 100;
    } else if (monthlySales > 0) {
      salesChangePercentage = 100; 
    }

    const pendingRepairsCount = technicalServices.filter(service => service.status !== 'Completado').length;
    
    const today = new Date().toISOString().slice(0,10);
    const repairsCompletedTodayCount = technicalServices.filter(service => service.status === 'Completado' && service.completionDate === today).length;


    const recentActivitiesList = serviceOrders.slice(-3).map(order => ({
      text: `Nueva orden de servicio #${order.orderNumber} para ${order.clientName}.`,
      time: new Date(order.date).toLocaleDateString(),
    }));
    
    technicalServices.slice(-2).forEach(service => {
        recentActivitiesList.push({
            text: `Servicio técnico "${service.serviceName}" para equipo "${service.equipmentName}" ${service.status === 'Completado' ? 'completado' : 'actualizado' }.`,
            time: service.lastUpdated ? new Date(service.lastUpdated).toLocaleDateString() : new Date().toLocaleDateString()
        });
    });
    recentActivitiesList.sort((a,b) => new Date(b.time) - new Date(a.time));


    setDashboardData({
      totalSalesMonth: monthlySales,
      salesChange: salesChangePercentage,
      pendingRepairs: pendingRepairsCount,
      repairsCompletedToday: repairsCompletedTodayCount,
      newClients: serviceOrders.length, 
      newClientsChange: 10, 
      recentActivities: recentActivitiesList.slice(0,5)
    });

  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-right mb-4">
      <Button onClick={handleLogout} variant="outline" className="text-sm">
      Cerrar Sesión
    </Button>
    </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="mb-12 pt-8 text-center">
            <h1 className="text-5xl font-extrabold gradient-text mb-3">Panel de Control</h1>
            <p className="text-lg text-gray-600">Resumen general de la actividad de tu negocio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Ventas Totales (Mes)" 
            value={`$${dashboardData.totalSalesMonth.toFixed(2)}`}
            change={`${dashboardData.salesChange >= 0 ? '+' : ''}${dashboardData.salesChange.toFixed(1)}% desde el mes pasado`}
            icon={<DollarSign size={24} />}
            color="bg-green-500"
            changeColor={dashboardData.salesChange >= 0 ? 'text-green-600' : 'text-red-600'}
          />
          <StatCard 
            title="Reparaciones Pendientes" 
            value={dashboardData.pendingRepairs.toString()}
            change={`${dashboardData.repairsCompletedToday} completadas hoy`}
            icon={<Wrench size={24} />}
            color="bg-yellow-500"
            changeColor="text-gray-600"
          />
          <StatCard 
            title="Nuevos Clientes (Total)" 
            value={`+${dashboardData.newClients}`}
            change={`+${dashboardData.newClientsChange.toFixed(0)}% esta semana (simulado)`}
            icon={<Users size={24} />}
            color="bg-blue-500"
            changeColor="text-green-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Actividad Reciente</h2>
            {dashboardData.recentActivities.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {dashboardData.recentActivities.map((activity, index) => (
                  <RecentActivityItem key={index} text={activity.text} time={activity.time} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay actividad reciente para mostrar.</p>
            )}
          </motion.div>

          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Accesos Rápidos</h2>
            <div className="space-y-4">
              <Link to="/admin/facturacion">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-3 text-base">
                  <FileText className="mr-2 h-5 w-5" /> Gestión de Órdenes
                </Button>
              </Link>
              <Link to="/admin/servicios-tecnicos">
                <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 text-base">
                  <Settings className="mr-2 h-5 w-5" /> Servicios Técnicos
                </Button>
              </Link>
              <Link to="/inicio">
                <Button variant="outline" className="w-full py-3 text-base">
                  <Activity className="mr-2 h-5 w-5" /> Ver Página Principal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;