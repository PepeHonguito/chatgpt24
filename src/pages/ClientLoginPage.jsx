import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const ClientLoginPage = ({ onClientLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const existingUsers = JSON.parse(localStorage.getItem('clientUsers')) || [];
    const user = existingUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isClientAuthenticated', 'true');
      localStorage.setItem('clientUser', JSON.stringify({email: user.email, name: user.name})); // Guardar solo info no sensible
      if(onClientLogin) onClientLogin();
      toast({
        title: `¡Bienvenido, ${user.name}!`,
        description: "Has iniciado sesión correctamente.",
        variant: "default",
      });
      navigate('/cliente/dashboard');
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
            Acceso Clientes
          </motion.h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Ingresa para ver tus órdenes y datos.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Label htmlFor="email" className="text-muted-foreground">Correo Electrónico</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="mt-1"/>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" className="mt-1"/>
              <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-primary" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </motion.div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600 dark:text-red-400 text-center">{error}</motion.p>}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <Button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <LogIn className="w-5 h-5 mr-2" />
              Ingresar
            </Button>
          </motion.div>
        </form>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">¿No tienes cuenta? </span>
          <Link to="/registro" className="font-medium text-primary hover:text-primary/80">
            Regístrate Aquí
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ClientLoginPage;