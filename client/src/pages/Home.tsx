import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckSquare, Search, Filter, Bell, BarChart, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, update, and organize your tasks effortlessly with our intuitive interface.',
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find any task instantly with powerful search and filter capabilities.',
    },
    {
      icon: Filter,
      title: 'Advanced Filtering',
      description: 'Sort and filter tasks by status, date, or custom criteria.',
    },
    {
      icon: Bell,
      title: 'Real-time Updates',
      description: 'Get instant notifications and stay updated with your task progress.',
    },
    {
      icon: BarChart,
      title: 'Analytics',
      description: 'Track your productivity with detailed task statistics and insights.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry-standard security.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Manage Your Tasks with{' '}
              <span className="text-gradient">Precision</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              TaskMaster helps you stay organized, focused, and productive. 
              Create, track, and complete tasks with an elegant and powerful interface.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto shadow-glow text-lg px-8 py-6">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Everything You Need to Stay Productive
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently and achieve your goals.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-primary shadow-glow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl gradient-hero p-12 text-center shadow-glow animate-fade-in">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Organized?
            </h2>
            <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks more efficiently with TaskMaster.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">TaskMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TaskMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
