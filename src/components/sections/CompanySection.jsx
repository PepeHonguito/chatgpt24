
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock } from 'lucide-react';

const CompanySection = () => {
  return (
    <section id="empresa" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 gradient-text">Conoce Mobilxpress</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos líderes en telefonía móvil con más de 15 años de experiencia,
            comprometidos con brindar la mejor tecnología y servicio al cliente
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img alt="Equipo profesional de MobileTech atendiendo clientes" className="w-full rounded-2xl shadow-xl" src="https://images.unsplash.com/photo-1544006658-5ed4d689eb5e" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">+50,000 Clientes Satisfechos</h3>
                <p className="text-gray-600">Confianza construida día a día</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Certificaciones Oficiales</h3>
                <p className="text-gray-600">Distribuidores autorizados de las mejores marcas</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Soporte 24/7</h3>
                <p className="text-gray-600">Atención personalizada cuando la necesites</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
