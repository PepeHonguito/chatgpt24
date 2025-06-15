import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AdminInvoicingPage from '@/pages/AdminInvoicingPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminTechnicalServicesPage from '@/pages/AdminTechnicalServicesPage';
import LoginPage from '@/pages/LoginPage'; // login de empresa
import DiagnosticPage from '@/pages/DiagnosticPage';
import ProtocolPage from '@/pages/ProtocolPage';


/**
 * Enrutador principal de la aplicación. La pantalla de inicio de sesión de la
 * empresa actúa como página de inicio, por lo que la raíz y
 * `/empresa/login` muestran el mismo componente. El sitio de marketing sigue
 * disponible en `/inicio`.
 */
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        {/* Contenedor de notificaciones */}
        <Toaster />
        <Header />
        <div className="flex-grow">
          <Routes>
            {/* El login de empresa es la página principal */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/empresa/login" element={<LoginPage />} />
            {/* Sitio público de marketing */}
            <Route path="/inicio" element={<HomePage />} />
            {/* Herramientas de soporte */}
            <Route path="/diagnostico" element={<DiagnosticPage />} />
            <Route path="/protocolo" element={<ProtocolPage />} />
            {/* Panel de administración y páginas relacionadas */}
            <Route path="/admin/facturacion" element={<AdminInvoicingPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/servicios-tecnicos" element={<AdminTechnicalServicesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
