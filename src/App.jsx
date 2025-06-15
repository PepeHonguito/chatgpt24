import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AdminInvoicingPage from '@/pages/AdminInvoicingPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminTechnicalServicesPage from '@/pages/AdminTechnicalServicesPage';
import LoginPage from '@/pages/LoginPage'; // login empresa
import DiagnosticPage from '@/pages/DiagnosticPage';
import ProtocolPage from '@/pages/ProtocolPage';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        <Toaster />
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/empresa/login" element={<LoginPage />} />
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/diagnostico" element={<DiagnosticPage />} />
            <Route path="/protocolo" element={<ProtocolPage />} />
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
