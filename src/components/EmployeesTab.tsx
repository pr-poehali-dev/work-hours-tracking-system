import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Employee, getStatusColor, getStatusLabel, getInitials } from '@/types/employee';

type EmployeesTabProps = {
  employees: Employee[];
};

const EmployeesTab = ({ employees }: EmployeesTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-primary/20 border-2 border-primary/30">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
              </div>
            </div>
            
            <Badge variant="outline" className={`mb-4 ${getStatusColor(employee.status)}`}>
              {getStatusLabel(employee.status)}
            </Badge>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Эта неделя:</span>
                <span className="font-semibold">{employee.hoursThisWeek}ч</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Этот месяц:</span>
                <span className="font-semibold">{employee.hoursThisMonth}ч</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 border-border hover:bg-accent">
              <Icon name="Edit" className="mr-2 h-4 w-4" />
              Редактировать
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeesTab;
