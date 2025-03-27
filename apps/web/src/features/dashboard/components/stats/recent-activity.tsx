import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Остання активність</CardTitle>
        <CardDescription>Останні дії, виконані в системі</CardDescription>
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
    userName: 'Олена Петренко',
    userAvatar: '',
    action: "Завантажила новий ресурс: 'Основи машинного навчання'",
    time: '2 години тому',
  },
  {
    userName: 'Михайло Коваленко',
    userAvatar: '',
    action: 'Змінив роль з «Користувача» на «Редактора»',
    time: '5 годин тому',
  },
  {
    userName: 'Емілія Савченко',
    userAvatar: '',
    action: 'Додала 3 нові книги до колекції комп’ютерних наук',
    time: 'Вчора',
  },
  {
    userName: 'Людмила Бойко',
    userAvatar: '',
    action: 'Зареєструвалася як редактор',
    time: '3 дні тому',
  },
];
