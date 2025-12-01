import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Employee, getInitials } from '@/types/employee';

type StatisticsTabProps = {
  employees: Employee[];
};

const StatisticsTab = ({ employees }: StatisticsTabProps) => {
  const totalHoursThisMonth = employees.reduce((sum, emp) => sum + emp.hoursThisMonth, 0);

  return (
    <div className="grid gap-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4">Общая статистика</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm text-muted-foreground mb-1">Всего часов (месяц)</p>
            <p className="text-3xl font-bold text-primary">{totalHoursThisMonth}</p>
          </div>
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm text-muted-foreground mb-1">Средняя нагрузка</p>
            <p className="text-3xl font-bold text-secondary">
              {Math.round(totalHoursThisMonth / employees.length)}ч
            </p>
          </div>
          <div className="p-4 rounded-lg bg-accent border border-border">
            <p className="text-sm text-muted-foreground mb-1">Коэффициент загрузки</p>
            <p className="text-3xl font-bold text-green-400">87%</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4">Топ сотрудников по часам</h3>
        <div className="space-y-3">
          {employees
            .sort((a, b) => b.hoursThisMonth - a.hoursThisMonth)
            .slice(0, 5)
            .map((employee, index) => (
              <div key={employee.id} className="flex items-center gap-4 p-4 rounded-lg bg-accent border border-border">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <Avatar className="h-10 w-10 bg-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{employee.hoursThisMonth}</p>
                  <p className="text-xs text-muted-foreground">часов</p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default StatisticsTab;
