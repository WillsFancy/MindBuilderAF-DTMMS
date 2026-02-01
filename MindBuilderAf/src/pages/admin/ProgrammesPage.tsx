import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Trash2, Edit, GraduationCap } from 'lucide-react';
import { getProgrammes, addProgramme, updateProgramme, deleteProgramme, getUsers } from '@/lib/localStorage';
import { Programme } from '@/types';

const ProgrammesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [programmes, setProgrammes] = useState(getProgrammes());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);
  
  const trainers = getUsers().filter(u => u.role === 'trainer');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    trainerId: '',
    maxParticipants: 30,
    status: 'upcoming' as Programme['status']
  });

  const refreshProgrammes = () => setProgrammes(getProgrammes());

  const filteredProgrammes = programmes.filter(prog => {
    const matchesSearch = 
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTrainerName = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer ? `${trainer.firstName} ${trainer.lastName}` : 'Unassigned';
  };

  const handleOpenDialog = (programme?: Programme) => {
    if (programme) {
      setEditingProgramme(programme);
      setFormData({
        title: programme.title,
        description: programme.description,
        category: programme.category,
        startDate: programme.startDate,
        endDate: programme.endDate,
        trainerId: programme.trainerId,
        maxParticipants: programme.maxParticipants,
        status: programme.status
      });
    } else {
      setEditingProgramme(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        startDate: '',
        endDate: '',
        trainerId: '',
        maxParticipants: 30,
        status: 'upcoming'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProgramme) {
      updateProgramme(editingProgramme.id, formData);
      toast({ title: 'Programme updated successfully' });
    } else {
      addProgramme(formData);
      toast({ title: 'Programme created successfully' });
    }
    
    refreshProgrammes();
    setIsDialogOpen(false);
  };

  const handleDelete = (programmeId: string) => {
    if (confirm('Are you sure you want to delete this programme?')) {
      deleteProgramme(programmeId);
      toast({ title: 'Programme deleted successfully', variant: 'destructive' });
      refreshProgrammes();
    }
  };

  const categories = ['Technology', 'Business', 'Finance', 'Soft Skills', 'Leadership', 'Health', 'Arts'];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Training Programmes</h1>
            <p className="text-muted-foreground">Manage all training programmes</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" /> New Programme
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Programmes Table */}
        <DataTable
          data={filteredProgrammes}
          columns={[
            { 
              key: 'title', 
              header: 'Programme',
              render: (item) => (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
              )
            },
            { 
              key: 'trainerId', 
              header: 'Trainer',
              render: (item) => getTrainerName(item.trainerId)
            },
            { 
              key: 'dates', 
              header: 'Duration',
              render: (item) => (
                <div className="text-sm">
                  <p>{new Date(item.startDate).toLocaleDateString()}</p>
                  <p className="text-muted-foreground">to {new Date(item.endDate).toLocaleDateString()}</p>
                </div>
              )
            },
            { 
              key: 'enrolledCount', 
              header: 'Enrolled',
              render: (item) => `${item.enrolledCount}/${item.maxParticipants}`
            },
            { 
              key: 'status', 
              header: 'Status',
              render: (item) => <StatusBadge status={item.status} />
            },
            { 
              key: 'actions', 
              header: 'Actions',
              render: (item) => (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDialog(item);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            },
          ]}
          emptyMessage="No programmes found"
        />

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProgramme ? 'Edit Programme' : 'Create New Programme'}</DialogTitle>
              <DialogDescription>
                {editingProgramme ? 'Update programme details' : 'Add a new training programme'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Programme Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trainer">Assigned Trainer</Label>
                  <Select 
                    value={formData.trainerId} 
                    onValueChange={(value) => setFormData({ ...formData, trainerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map(trainer => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.firstName} {trainer.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: Programme['status']) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProgramme ? 'Update' : 'Create'} Programme
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ProgrammesPage;
