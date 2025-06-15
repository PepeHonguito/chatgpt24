
import React from 'react';
import { Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Mobilxpress</span>
            </div>
            <p className="text-gray-400">
              Tu socio confiable en tecnología móvil desde 2008
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Servicios</span>
            <ul className="space-y-2 text-gray-400">
              <li>Venta de Equipos</li>
              <li>Reparación de Celulares</li>
              <li>Sofware</li>
              <li>Accesorios</li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Productos</span>
            <ul className="space-y-2 text-gray-400">
              <li>iPhone</li>
              <li>Samsung</li>
              <li>Google Pixel</li>
              <li>Accesorios</li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Horarios</span>
            <div className="space-y-2 text-gray-400">
              <p>Lunes - Viernes: 10:00 - 13:00 </p>
              <p>Lunes - Viernes: 16:00 - 19:00</p>
              <p>Sábados: 10:00 - 14:00</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mobilxpress. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
