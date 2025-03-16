import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ResourcesOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources Overview</CardTitle>
        <CardDescription>Distribution by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resourceCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{category.count}</span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const resourceCategories = [
  {
    name: 'Computer Science',
    count: '2,845',
    percentage: 32,
    color: 'bg-blue-500',
  },
  {
    name: 'Engineering',
    count: '1,762',
    percentage: 20,
    color: 'bg-green-500',
  },
  {
    name: 'Mathematics',
    count: '1,352',
    percentage: 15,
    color: 'bg-amber-500',
  },
  {
    name: 'Physics',
    count: '1,204',
    percentage: 13,
    color: 'bg-purple-500',
  },
  {
    name: 'Other',
    count: '792',
    percentage: 9,
    color: 'bg-gray-500',
  },
];
