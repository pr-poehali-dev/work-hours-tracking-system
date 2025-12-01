import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Employee } from '@/types/employee';

type DashboardHeaderProps = {
  employees: Employee[];
  onAutoDistribute: () => void;
};

const DashboardHeader = ({ employees, onAutoDistribute }: DashboardHeaderProps) => {
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const onVacation = employees.filter(emp => emp.status === 'vacation').length;
  const onSickLeave = employees.filter(emp => emp.status === 'sick').length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Учет рабочего времени
          </h1>
          <p className="text-muted-foreground">Система управления графиком и сменами</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onAutoDistribute}
            className="bg-secondary hover:bg-secondary/90"
          >
            <Icon name="Shuffle" className="mr-2 h-4 w-4" />
            Распределить смены
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" className="mr-2 h-4 w-4" />
                Добавить сотрудника
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Новый сотрудник</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Введите имя" className="bg-accent border-border" />
                </div>
                <div>
                  <Label htmlFor="position">Должность</Label>
                  <Input id="position" placeholder="Введите должность" className="bg-accent border-border" />
                </div>
                <div>
                  <Label htmlFor="status">Статус</Label>
                  <Select>
                    <SelectTrigger className="bg-accent border-border">
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Работает</SelectItem>
                      <SelectItem value="vacation">Отпуск</SelectItem>
                      <SelectItem value="sick">Больничный</SelectItem>
                      <SelectItem value="dayoff">Выходной</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Добавить</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Всего сотрудников</p>
              <p className="text-3xl font-bold">{employees.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Users" className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Активных</p>
              <p className="text-3xl font-bold text-green-400">{activeEmployees}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Icon name="CheckCircle" className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">В отпуске</p>
              <p className="text-3xl font-bold text-blue-400">{onVacation}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Icon name="Plane" className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">На больничном</p>
              <p className="text-3xl font-bold text-red-400">{onSickLeave}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Icon name="Heart" className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHeader;
