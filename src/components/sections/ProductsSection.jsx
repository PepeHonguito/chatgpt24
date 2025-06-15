
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductsSection = ({ products }) => {
  return (
    <section id="productos" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 gradient-text">Productos Destacados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los smartphones más avanzados con la mejor relación calidad-precio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg card-hover border-2 ${
                product.popular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <img alt={`${product.name} smartphone`} className="w-48 h-48 mx-auto object-contain mb-4" src="https://images.unsplash.com/photo-1604406110123-ce9b6370cfc6" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-3xl font-bold text-blue-600">{product.price}</p>
              </div>

              <div className="space-y-3 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Comprar Ahora
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
