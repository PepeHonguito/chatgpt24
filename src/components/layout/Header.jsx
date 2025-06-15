import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Briefcase, Settings, FileText, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  // Apply a solid background and admin links when on the login page or any
  // admin route. The marketing site keeps a translucent glass effect.
  const isAdminRoute = location.pathname === '/' ||
    location.pathname === '/empresa/login' ||
    location.pathname.startsWith('/admin');

  return (
    <header className={`fixed top-0 w-full z-50 ${isAdminRoute ? 'bg-slate-800 shadow-lg' : 'glass-effect'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAdminRoute ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${isAdminRoute ? 'text-white' : 'gradient-text'}`}>MobileTech</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-6 items-center"
          >
            {isAdminRoute ? (
              <>
                {/* Links shown when logged in as empresa/admin */}
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Briefcase className="w-5 h-5 mr-1.5" /> Dashboard
                </Link>
                <Link to="/admin/facturacion" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <FileText className="w-5 h-5 mr-1.5" /> Órdenes
                </Link>
                <Link to="/admin/servicios-tecnicos" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Settings className="w-5 h-5 mr-1.5" /> Serv. Técnicos
                </Link>
                <Link to="/inicio" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Users className="w-5 h-5 mr-1.5" /> Vista Cliente
                </Link>
              </>
            ) : (
              <>
                {/* Navigation for the public marketing site */}
                <a href="/inicio#inicio" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Empresa</Link>

                <a href="/inicio#servicios" className="text-gray-700 hover:text-blue-600 transition-colors">Servicios</a>
                <a href="/inicio#productos" className="text-gray-700 hover:text-blue-600 transition-colors">Productos</a>
                <a href="/inicio#contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
              </>
            )}
          </motion.div>
        </div>
      </nav>
    </header>
  );
};

export default Header;