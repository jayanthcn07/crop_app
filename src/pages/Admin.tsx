import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, Database, Trash2, Shield, ChevronDown, ChevronUp, Search, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  role: 'admin' | 'user';
}

interface DetectionData {
  id: string;
  user_id: string;
  plant_name: string | null;
  disease: string | null;
  confidence: number | null;
  severity: string | null;
  created_at: string;
  user_email?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [detections, setDetections] = useState<DetectionData[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingDetections, setIsLoadingDetections] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<'users' | 'detections' | null>('users');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchDetections();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: roles } = await supabase
        .from('user_roles')
        .select('*');

      if (profiles && roles) {
        const usersWithRoles = profiles.map(profile => {
          const userRole = roles.find(r => r.user_id === profile.id);
          return {
            ...profile,
            role: userRole?.role || 'user'
          };
        });
        setUsers(usersWithRoles as UserData[]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchDetections = async () => {
    setIsLoadingDetections(true);
    try {
      const { data } = await supabase
        .from('detection_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (data) {
        const userIds = [...new Set(data.map(d => d.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', userIds);

        const detectionsWithEmail = data.map(detection => ({
          ...detection,
          user_email: profiles?.find(p => p.id === detection.user_id)?.email
        }));

        setDetections(detectionsWithEmail as DetectionData[]);
      }
    } catch (error) {
      console.error('Error fetching detections:', error);
    } finally {
      setIsLoadingDetections(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await supabase.from('profiles').delete().eq('id', userId);
      await supabase.from('user_roles').delete().eq('user_id', userId);
      await supabase.from('detection_history').delete().eq('user_id', userId);
      
      setUsers(users.filter(u => u.id !== userId));
      setDetections(detections.filter(d => d.user_id !== userId));
      
      toast({
        title: "User Deleted",
        description: "User data has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const deleteDetection = async (detectionId: string) => {
    try {
      await supabase.from('detection_history').delete().eq('id', detectionId);
      setDetections(detections.filter(d => d.id !== detectionId));
      
      toast({
        title: "Detection Deleted",
        description: "Detection record has been removed.",
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Failed to delete detection.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDetections = detections.filter(d =>
    d.plant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.disease?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              {t('admin.title')}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              System Administration
            </h1>
            <p className="text-muted-foreground">
              Manage users, view detection history, and monitor system activity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-6 rounded-2xl shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">{t('admin.total.users')}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{detections.length}</p>
                  <p className="text-sm text-muted-foreground">{t('admin.total.detections')}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl shadow-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Admin Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={t('library.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Section */}
          <div className="glass-card rounded-2xl shadow-card mb-6 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'users' ? null : 'users')}
              className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">{t('admin.users')} Management</h2>
                <Badge variant="secondary">{filteredUsers.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchUsers();
                  }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingUsers ? 'animate-spin' : ''}`} />
                </Button>
                {expandedSection === 'users' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {expandedSection === 'users' && (
              <div className="border-t border-border">
                {isLoadingUsers ? (
                  <div className="p-8 flex justify-center">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('auth.email')}</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((userData) => (
                          <TableRow key={userData.id}>
                            <TableCell className="font-medium">{userData.email}</TableCell>
                            <TableCell>{userData.full_name || '-'}</TableCell>
                            <TableCell>
                              <Badge variant={userData.role === 'admin' ? 'destructive' : 'secondary'}>
                                {userData.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(userData.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              {userData.id !== user?.id && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete User?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete this user's profile and all their detection history.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteUser(userData.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detections Section */}
          <div className="glass-card rounded-2xl shadow-card overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'detections' ? null : 'detections')}
              className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-success" />
                <h2 className="text-lg font-bold text-foreground">{t('admin.detections')} History</h2>
                <Badge variant="secondary">{filteredDetections.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchDetections();
                  }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingDetections ? 'animate-spin' : ''}`} />
                </Button>
                {expandedSection === 'detections' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {expandedSection === 'detections' && (
              <div className="border-t border-border">
                {isLoadingDetections ? (
                  <div className="p-8 flex justify-center">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : filteredDetections.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No detection records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plant</TableHead>
                          <TableHead>Disease</TableHead>
                          <TableHead>Confidence</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDetections.map((detection) => (
                          <TableRow key={detection.id}>
                            <TableCell className="font-medium">
                              {detection.user_email || 'Unknown'}
                            </TableCell>
                            <TableCell>{detection.plant_name || '-'}</TableCell>
                            <TableCell>{detection.disease || t('severity.healthy')}</TableCell>
                            <TableCell>
                              {detection.confidence 
                                ? `${Math.round(detection.confidence * 100)}%` 
                                : '-'}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  detection.severity === 'healthy' ? 'default' :
                                  detection.severity === 'critical' || detection.severity === 'high' ? 'destructive' :
                                  'secondary'
                                }
                              >
                                {detection.severity || '-'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(detection.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Detection?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete this detection record.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteDetection(detection.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
