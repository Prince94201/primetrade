import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, SortAsc } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { api } from '@/services/api';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
}

const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort') || 'desc';

  useEffect(() => {
    fetchTasks();
  }, [search, status, sort]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const params: any = { sort };
      if (search) params.search = search;
      if (status !== 'all') params.status = status;
      
      const response = await api.getTasks(params);
      if (response.success) {
        setTasks(response.data);
      } else {
        toast.error('Failed to fetch tasks');
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const response = await api.createTask(taskData);
      if (response.success) {
        toast.success('Task created successfully!');
        fetchTasks();
      } else {
        toast.error(response.message || 'Failed to create task');
      }
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id'>) => {
    if (!editingTask) return;
    
    try {
      const response = await api.updateTask(editingTask.id, taskData);
      if (response.success) {
        toast.success('Task updated successfully!');
        fetchTasks();
        setEditingTask(null);
      } else {
        toast.error(response.message || 'Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    try {
      const response = await api.deleteTask(taskToDelete);
      if (response.success) {
        toast.success('Task deleted successfully!');
        fetchTasks();
      } else {
        toast.error(response.message || 'Failed to delete task');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const response = await api.updateTask(task.id, { status: newStatus });
      if (response.success) {
        toast.success(`Task marked as ${newStatus}!`);
        fetchTasks();
      }
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
          <p className="text-muted-foreground text-lg">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null);
            setFormOpen(true);
          }}
          className="shadow-glow"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3 animate-slide-up">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => updateSearchParam('search', e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={status} onValueChange={(v) => updateSearchParam('status', v)}>
          <SelectTrigger>
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => updateSearchParam('sort', v)}>
          <SelectTrigger>
            <SortAsc className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-6">
            {search || status !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by creating your first task'}
          </p>
          {!search && status === 'all' && (
            <Button onClick={() => setFormOpen(true)} className="shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <div key={task.id} style={{ animationDelay: `${index * 50}ms` }}>
              <TaskCard
                task={task}
                onEdit={(t) => {
                  setEditingTask(t);
                  setFormOpen(true);
                }}
                onDelete={(id) => {
                  setTaskToDelete(id);
                  setDeleteDialogOpen(true);
                }}
                onToggleStatus={handleToggleStatus}
              />
            </div>
          ))}
        </div>
      )}

      {/* Task Form Dialog */}
      <TaskForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        mode={editingTask ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTask}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tasks;
