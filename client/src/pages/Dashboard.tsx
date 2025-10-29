import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, ListTodo, ArrowRight } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface Stats {
  total: number;
  pending: number;
  completed: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getTasks();
      if (response.success) {
        const tasks = response.data;
        setStats({
          total: tasks.length,
          pending: tasks.filter((t: any) => t.status === 'pending').length,
          completed: tasks.filter((t: any) => t.status === 'completed').length,
        });
      }
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Circle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="text-gradient">{user?.name}</span>!
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's an overview of your tasks and productivity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            className="transition-all duration-300 hover:shadow-glow hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? (
                  <div className="h-9 w-16 animate-pulse bg-muted rounded"></div>
                ) : (
                  stat.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 animate-slide-up">
        <Card className="transition-all duration-300 hover:shadow-glow">
          <CardHeader>
            <CardTitle>Manage Tasks</CardTitle>
            <CardDescription>
              View, create, edit, and organize all your tasks in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/tasks">
              <Button className="w-full shadow-glow group">
                Go to Tasks
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-glow">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Update your account information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/profile">
              <Button variant="outline" className="w-full group">
                Edit Profile
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* User Info Card */}
      <Card className="mt-6 animate-fade-in">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your current account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
