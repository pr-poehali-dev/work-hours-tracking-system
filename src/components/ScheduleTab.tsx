import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employee, getInitials } from '@/types/employee';

type ScheduleTabProps = {
  employees: Employee[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
};

const ScheduleTab = ({ employees, selectedDate, onSelectDate }: ScheduleTabProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Календарь</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            className="rounded-md border border-border bg-accent"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            График на {selectedDate?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          <div className="space-y-3">
            {employees.slice(0, 5).map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg bg-accent border border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <Select defaultValue="day">
                  <SelectTrigger className="w-32 bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">День (8ч)</SelectItem>
                    <SelectItem value="night">Ночь (10ч)</SelectItem>
                    <SelectItem value="off">Выходной</SelectItem>
                    <SelectItem value="vacation">Отпуск</SelectItem>
                    <SelectItem value="sick">Больничный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleTab;
