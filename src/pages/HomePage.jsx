import React from 'react';
import { Smartphone, Shield, Wrench } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

import HeroSection from '@/components/sections/HeroSection';
import CompanySection from '@/components/sections/CompanySection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ContactSection from '@/components/sections/ContactSection';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const HomePage = () => {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    e.target.reset();
  };

  const services = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Venta de Equipos",
      description: "Los últimos modelos de smartphones con la mejor tecnología del mercado."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Reparación de Celulares",
      description: "Servicio de reparación rápida pantallas rotas, cambio de batería, problemas de carga, etc."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguros y Garantías",
      description: "Protección completa para tu dispositivo móvil."
    }
  ];

  const products = [
    {
      name: "iPhone 15 Pro",
      price: "$999",
      features: ["128GB", "Cámara Pro", "5G"],
      popular: true,
      image: "https://images.unsplash.com/photo-1604406110123-ce9b6370cfc6" 
    },
    {
      name: "Samsung Galaxy S24",
      price: "$849",
      features: ["256GB", "AI Camera", "5G"],
      popular: false,
      image: "https://images.unsplash.com/photo-1604406110123-ce9b6370cfc6"
    },
    {
      name: "Google Pixel 8",
      price: "$699",
      features: ["128GB", "Magic Eraser", "5G"],
      popular: false,
      image: "https://images.unsplash.com/photo-1604406110123-ce9b6370cfc6"
    }
  ];

  const WHATSAPP_PHONE_NUMBER = "542612444622";

  return (
    <>
      <main>
        <HeroSection />
        <CompanySection />
        <ServicesSection services={services} />
        <ProductsSection products={products} />
        <ContactSection onContactSubmit={handleContactSubmit} />
      </main>
      <WhatsAppButton phoneNumber={WHATSAPP_PHONE_NUMBER} />
    </>
  );
};

export default HomePage;