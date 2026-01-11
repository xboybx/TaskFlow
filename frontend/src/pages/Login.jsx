import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen grid lg:grid-cols-2">
      {/* Decorative Background for Mobile / Left Side */}
      <div className="absolute inset-0 z-[-1] bg-muted/20 lg:hidden" />

      {/* Left Side: Form */}
      <div className="flex items-center justify-center p-8 bg-background relative">
        {/* Background Orbs */}
        <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 glass-card p-8 rounded-2xl"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'border-destructive bg-destructive/5' : 'bg-background/50'}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-destructive bg-destructive/5' : 'bg-background/50'}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></span>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </span>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right Side: Showcase */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-muted/10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-[20%] right-[20%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 max-w-lg text-center space-y-4"
        >
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            {/* Placeholder for an illustration or abstract UI element */}
            <div className="bg-card shadow-2xl rounded-xl p-6 border w-full aspect-video flex items-center justify-center">
              <div className="space-y-2 w-full">
                <div className="h-2 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-2 bg-muted rounded w-1/2 mx-auto" />
                <div className="h-32 bg-muted/20 rounded mt-4" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Boost your productivity</h2>
          <p className="text-muted-foreground text-lg">
            Manage tasks, track progress, and organize your work efficiently with our modern dashboard.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
