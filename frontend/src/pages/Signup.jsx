import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { z } from 'zod';
import { UserPlus, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    const result = signupSchema.safeParse({ name, email, password, confirmPassword });
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
      await signup(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen grid lg:grid-cols-2">
      {/* Decorative Background for Mobile / Left Side */}
      <div className="absolute inset-0 z-[-1] bg-muted/20 lg:hidden" />

      {/* Left Side: Showcase (Hidden on Mobile) - Swapped for variety or keep same? Let's keep consistent: Form Left, Art Right usually but let's mirror Login for fun? No, consistency is better. Form Left. */}
      <div className="flex items-center justify-center p-8 bg-background relative order-last lg:order-first">
        {/* Background Orbs */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 glass-card p-8 rounded-2xl"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground">Enter your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {apiError && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'border-destructive bg-destructive/5' : 'bg-background/50'}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-destructive bg-destructive/5' : 'bg-background/50'}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? 'border-destructive bg-destructive/5' : 'bg-background/50'}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></span>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create account
                </span>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right Side: Showcase */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-muted/10 overflow-hidden order-first lg:order-last">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="absolute bottom-[20%] left-[20%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 max-w-lg text-center space-y-4"
        >
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            {/* Placeholder for an illustration */}
            <div className="bg-card shadow-2xl rounded-xl p-6 border w-full aspect-video flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="h-24 bg-muted/20 rounded" />
                <div className="h-24 bg-muted/20 rounded" />
                <div className="h-24 bg-muted/20 rounded col-span-2" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold tracking-tight">Join TaskFlow today</h2>
          <p className="text-muted-foreground text-lg">
            Experience the future of task management. Simple, fast, and effective.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
