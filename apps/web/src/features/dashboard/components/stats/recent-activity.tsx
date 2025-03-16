import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                <AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.userName}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const recentActivities = [
  {
    userName: 'Sarah Johnson',
    userAvatar: '',
    action: "Uploaded a new resource: 'Machine Learning Fundamentals'",
    time: '2 hours ago',
  },
  {
    userName: 'Michael Chen',
    userAvatar: '',
    action: "Changed role from 'User' to 'Editor'",
    time: '5 hours ago',
  },
  {
    userName: 'Emily Rodriguez',
    userAvatar: '',
    action: 'Added 3 new books to the Computer Science collection',
    time: 'Yesterday',
  },
  {
    userName: 'Lisa Wang',
    userAvatar: '',
    action: 'Registered as a new editor',
    time: '3 days ago',
  },
];
