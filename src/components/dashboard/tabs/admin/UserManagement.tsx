
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Users, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    job_title: '',
    company_name: '',
    role: 'client',
    stripe_customer_id: '',
    jira_email: '',
    access_permissions: {
      dashboard: true,
      billing: false,
      support: false,
      services: false,
      account: true
    }
  });

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          companies(name)
        `);
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name');
      
      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
          data: {
            full_name: formData.full_name,
          }
        }
      });

      if (authError) throw authError;

      // Update profile with additional data
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: formData.phone,
            job_title: formData.job_title,
            role: formData.role,
            stripe_customer_id: formData.stripe_customer_id,
            jira_email: formData.jira_email,
            access_permissions: formData.access_permissions
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        // Send credentials email
        try {
          const { error: emailError } = await supabase.functions.invoke('send-user-credentials', {
            body: {
              email: formData.email,
              full_name: formData.full_name,
              password: formData.password,
              company_name: formData.company_name,
              role: formData.role
            }
          });

          if (emailError) {
            console.error('Email sending failed:', emailError);
            toast.success('User created successfully, but email notification failed');
          } else {
            toast.success('User created and credentials sent via email');
          }
        } catch (emailError) {
          console.error('Email error:', emailError);
          toast.success('User created successfully, but email notification failed');
        }
      }

      setShowCreateForm(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          job_title: formData.job_title,
          role: formData.role,
          stripe_customer_id: formData.stripe_customer_id,
          jira_email: formData.jira_email,
          access_permissions: formData.access_permissions
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      toast.success('User updated successfully');
      setEditingUser(null);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      password: '',
      phone: '',
      job_title: '',
      company_name: '',
      role: 'client',
      stripe_customer_id: '',
      jira_email: '',
      access_permissions: {
        dashboard: true,
        billing: false,
        support: false,
        services: false,
        account: true
      }
    });
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setFormData({
      full_name: user.full_name || '',
      email: user.email || '',
      password: '',
      phone: user.phone || '',
      job_title: user.job_title || '',
      company_name: user.companies?.name || '',
      role: user.role || 'client',
      stripe_customer_id: user.stripe_customer_id || '',
      jira_email: user.jira_email || '',
      access_permissions: user.access_permissions || {
        dashboard: true,
        billing: false,
        support: false,
        services: false,
        account: true
      }
    });
    setShowCreateForm(true);
  };

  const handleImpersonate = (user) => {
    // Store impersonation data in localStorage
    localStorage.setItem('impersonating_user', JSON.stringify({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      company_id: user.company_id,
      stripe_customer_id: user.stripe_customer_id
    }));
    
    toast.success(`Now viewing as ${user.full_name || user.email}`);
    
    // Redirect to dashboard to see user's view
    window.location.href = '/portal';
  };

  const handleDeleteUser = async (user) => {
    if (!confirm(`Are you sure you want to delete user "${user.full_name || user.email}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // Use the edge function for proper user deletion
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId: user.id }
      });

      if (error) throw error;

      if (data.warning) {
        toast.success(`User deleted with warning: ${data.warning}`);
      } else {
        toast.success(`User ${user.full_name || user.email} deleted successfully`);
      }
      
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  const handleCleanupOrphanedUsers = async () => {
    if (!confirm('This will remove any auth users that don\'t have corresponding profiles. Continue?')) {
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('cleanup-orphaned-users');

      if (error) throw error;

      toast.success(`Cleanup completed: ${data.summary.deleted} orphaned users removed`);
      console.log('Cleanup results:', data);
    } catch (error) {
      console.error('Error during cleanup:', error);
      toast.error('Failed to cleanup orphaned users');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">User Management</h3>
        <div className="flex space-x-3">
          <Button 
            onClick={handleCleanupOrphanedUsers}
            variant="outline"
            className="text-orange-600 hover:text-orange-700"
          >
            Cleanup Orphaned Users
          </Button>
          <Button 
            onClick={() => {
              setShowCreateForm(true);
              setEditingUser(null);
              resetForm();
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create User
          </Button>
        </div>
      </div>

      {/* Create/Edit User Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUser ? 'Edit User' : 'Create New User'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={editingUser}
                />
              </div>
            </div>

            {!editingUser && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.job_title}
                  onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({...formData, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stripeCustomerId">Stripe Customer ID</Label>
                <Input
                  id="stripeCustomerId"
                  value={formData.stripe_customer_id}
                  onChange={(e) => setFormData({...formData, stripe_customer_id: e.target.value})}
                  placeholder="Enter Stripe Customer ID"
                />
              </div>
              <div>
                <Label htmlFor="jiraEmail">Jira Email Address</Label>
                <Input
                  id="jiraEmail"
                  type="email"
                  value={formData.jira_email}
                  onChange={(e) => setFormData({...formData, jira_email: e.target.value})}
                  placeholder="Enter Jira email address"
                />
              </div>
            </div>

            {/* Access Permissions */}
            <div>
              <Label className="text-lg font-medium">Tab Access Permissions</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.entries(formData.access_permissions).map(([tab, enabled]) => (
                  <div key={tab} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="capitalize font-medium">{tab}</span>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => 
                        setFormData({
                          ...formData,
                          access_permissions: {
                            ...formData.access_permissions,
                            [tab]: checked
                          }
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingUser(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{user.full_name}</p>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-400">
                      {user.companies?.name || 'No company'} • {user.role}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startEdit(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleImpersonate(user)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
