import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginPage = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (email === 'chipscrafter@gmail.com' && password === '@12/02/02') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      if(onAdminLogin) onAdminLogin();
      toast({
        title: "¡Bienvenido, Admin!",
        description: "Has iniciado sesión correctamente en el panel de empresa.",
        variant: "default",
      });
      navigate('/admin/dashboard');
    } else {
      setError('Correo electrónico o contraseña incorrectos.');
      toast({
        title: "Error de inicio de sesión",
        description: "Correo electrónico o contraseña incorrectos. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-800 dark:to-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-10 bg-card shadow-2xl rounded-xl dark:border dark:border-slate-700"
      >
        <div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-center text-4xl font-extrabold gradient-text"
          >
            Acceso Empresa
          </motion.h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Ingresa tus credenciales para acceder al panel de administración.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Label htmlFor="email" className="text-muted-foreground">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-input placeholder-gray-500 text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm mt-1"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4"
            >
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-input placeholder-gray-500 text-foreground focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm mt-1"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </motion.div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 dark:text-red-400 text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <LogIn className="w-5 h-5 mr-2" />
              Ingresar
            </Button>
          </motion.div>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Acceso exclusivo para administración.
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;


