import { useState } from 'react';
// import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Trophy,
  Target,
  Clock,
  Edit3
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const {user,signoutUser} = useAuth();

  const handleSignOut = async () => {
    await signoutUser();
    toast.success("Signed out successfully!");
  };

  if (!user) return null;

  const stats = [
    { label: 'Interviews Completed', value: '12', icon: Trophy },
    { label: 'Success Rate', value: '85%', icon: Target },
    { label: 'Total Time', value: '6.5h', icon: Clock }
  ];

  return (
    <div className="min-h-screen">
        <div className=" space-y-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Dashboard</h1>
                <p className="text-gray-600">Manage your account and track your progress</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-6">
                            <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                                <AvatarImage src={user.photoURL || ""} />
                                <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {user.displayName?.charAt(0) || "U"}
                                </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {user.displayName || "Anonymous User"}
                                </h2>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined {new Date().toLocaleDateString()}</span>
                                </div>
                                <Badge variant="secondary" className="bg-green-100 text-green-700">
                                    Active User
                                </Badge>
                                </div>
                            </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <Separator />
                            
                            <div className="grid grid-cols-3 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                        <stat.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                            <div className="space-y-3">
                                {[
                                'Completed JavaScript Interview - Score: 92%',
                                'Started React.js Assessment',
                                'Updated profile information'
                                ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-700">{activity}</span>
                                </div>
                                ))}
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button className="w-full justify-start" variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Edit Profile
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                        <Trophy className="h-4 w-4 mr-2" />
                        View Achievements
                        </Button>
                        <Separator />
                        <Button 
                        onClick={handleSignOut}
                        className="w-full justify-start" 
                        variant="destructive"
                        >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                        </Button>
                    </CardContent>
                    </Card>

                    {/* Achievement Card */}
                    {/* <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Latest Achievement</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-3">
                        <Trophy className="h-8 w-8" />
                        <div>
                            <div className="font-semibold">Interview Master</div>
                            <div className="text-sm opacity-90">Completed 10+ interviews</div>
                        </div>
                        </div>
                    </CardContent>
                    </Card> */}
                </div>
            </div>
        </div>
    </div>
  );
}