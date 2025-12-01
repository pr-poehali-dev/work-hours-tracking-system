import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Employee, getInitials } from '@/types/employee';

type ShiftsTabProps = {
  employees: Employee[];
};

const ShiftsTab = ({ employees }: ShiftsTabProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Типы смен</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-accent border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Icon name="Sun" className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-semibold">Дневная смена</h4>
              <p className="text-sm text-muted-foreground">8 часов</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">09:00 - 18:00</p>
        </Card>

        <Card className="p-4 bg-accent border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Icon name="Moon" className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold">Ночная смена</h4>
              <p className="text-sm text-muted-foreground">10 часов</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">22:00 - 08:00</p>
        </Card>

        <Card className="p-4 bg-accent border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Icon name="Briefcase" className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold">Сутки</h4>
              <p className="text-sm text-muted-foreground">24 часа</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">08:00 - 08:00</p>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mb-4">История смен</h3>
      <div className="space-y-2">
        {employees.slice(0, 6).map((employee) => (
          <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg bg-accent border border-border hover:bg-accent/80 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-muted-foreground">Сегодня</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Дневная смена
              </Badge>
              <span className="text-sm font-semibold">8ч</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ShiftsTab;
