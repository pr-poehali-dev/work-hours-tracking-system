import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Employee = {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'vacation' | 'sick' | 'dayoff';
  hoursThisWeek: number;
  hoursThisMonth: number;
};

type ShiftType = 'day' | 'night' | 'off' | 'vacation' | 'sick';

type Shift = {
  employeeId: number;
  date: Date;
  type: ShiftType;
  hours: number;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Иван Петров', position: 'Менеджер', status: 'active', hoursThisWeek: 40, hoursThisMonth: 168 },
    { id: 2, name: 'Мария Сидорова', position: 'Разработчик', status: 'active', hoursThisWeek: 42, hoursThisMonth: 172 },
    { id: 3, name: 'Алексей Козлов', position: 'Дизайнер', status: 'vacation', hoursThisWeek: 0, hoursThisMonth: 120 },
    { id: 4, name: 'Елена Волкова', position: 'Аналитик', status: 'active', hoursThisWeek: 38, hoursThisMonth: 160 },
    { id: 5, name: 'Дмитрий Новиков', position: 'Тестировщик', status: 'sick', hoursThisWeek: 16, hoursThisMonth: 88 },
    { id: 6, name: 'Ольга Морозова', position: 'HR', status: 'active', hoursThisWeek: 40, hoursThisMonth: 168 },
    { id: 7, name: 'Сергей Лебедев', position: 'Менеджер', status: 'active', hoursThisWeek: 45, hoursThisMonth: 180 },
    { id: 8, name: 'Анна Соколова', position: 'Разработчик', status: 'dayoff', hoursThisWeek: 32, hoursThisMonth: 144 },
  ]);

  const [shifts, setShifts] = useState<Shift[]>([
    { employeeId: 1, date: new Date(2024, 11, 1), type: 'day', hours: 8 },
    { employeeId: 1, date: new Date(2024, 11, 2), type: 'day', hours: 8 },
    { employeeId: 2, date: new Date(2024, 11, 1), type: 'night', hours: 10 },
    { employeeId: 3, date: new Date(2024, 11, 1), type: 'vacation', hours: 0 },
  ]);

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'vacation': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'sick': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'dayoff': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const getStatusLabel = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'Работает';
      case 'vacation': return 'Отпуск';
      case 'sick': return 'Больничный';
      case 'dayoff': return 'Выходной';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const autoDistributeShifts = () => {
    const activeEmps = employees.filter(emp => emp.status === 'active');
    if (activeEmps.length === 0) return;

    const today = new Date();
    const daysToSchedule = 30;
    const newShifts: Shift[] = [];
    const employeeHours: { [key: number]: number } = {};
    
    activeEmps.forEach(emp => {
      employeeHours[emp.id] = 0;
    });

    for (let day = 0; day < daysToSchedule; day++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + day);
      
      const sortedEmployees = activeEmps.sort((a, b) => 
        (employeeHours[a.id] || 0) - (employeeHours[b.id] || 0)
      );
      
      const shiftTypes: ShiftType[] = day % 7 === 5 || day % 7 === 6 ? ['off'] : ['day', 'night'];
      
      shiftTypes.forEach((shiftType, index) => {
        if (index < sortedEmployees.length) {
          const employee = sortedEmployees[index];
          const hours = shiftType === 'day' ? 8 : shiftType === 'night' ? 10 : 0;
          
          newShifts.push({
            employeeId: employee.id,
            date: new Date(currentDate),
            type: shiftType,
            hours: hours
          });
          
          employeeHours[employee.id] += hours;
        }
      });
    }

    setShifts(newShifts);
    
    const updatedEmployees = employees.map(emp => {
      const totalHours = employeeHours[emp.id] || emp.hoursThisMonth;
      return {
        ...emp,
        hoursThisMonth: totalHours,
        hoursThisWeek: Math.min(totalHours, 40)
      };
    });
    
    setEmployees(updatedEmployees);
  };

  const totalHoursThisMonth = employees.reduce((sum, emp) => sum + emp.hoursThisMonth, 0);
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const onVacation = employees.filter(emp => emp.status === 'vacation').length;
  const onSickLeave = employees.filter(emp => emp.status === 'sick').length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
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
                onClick={autoDistributeShifts}
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
              </Dialog>
            </div>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border mb-6">
            <TabsTrigger value="employees" className="data-[state=active]:bg-primary">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary">
              <Icon name="Calendar" className="mr-2 h-4 w-4" />
              График
            </TabsTrigger>
            <TabsTrigger value="shifts" className="data-[state=active]:bg-primary">
              <Icon name="Clock" className="mr-2 h-4 w-4" />
              Смены
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-primary">
              <Icon name="BarChart" className="mr-2 h-4 w-4" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary">
              <Icon name="Settings" className="mr-2 h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="p-6 bg-card border-border">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Календарь</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
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
          </TabsContent>

          <TabsContent value="shifts">
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
          </TabsContent>

          <TabsContent value="statistics">
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
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold mb-6">Настройки системы</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Рабочее время</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="work-hours">Стандартная смена (часы)</Label>
                      <Input id="work-hours" type="number" defaultValue="8" className="bg-accent border-border" />
                    </div>
                    <div>
                      <Label htmlFor="work-days">Рабочих дней в неделю</Label>
                      <Input id="work-days" type="number" defaultValue="5" className="bg-accent border-border" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent border border-border">
                      <div>
                        <p className="font-medium">Напоминания о смене</p>
                        <p className="text-sm text-muted-foreground">Получать уведомления за 1 час до начала</p>
                      </div>
                      <Button variant="outline" size="sm">Включено</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-accent border border-border">
                      <div>
                        <p className="font-medium">Отчеты по email</p>
                        <p className="text-sm text-muted-foreground">Еженедельная сводка по часам</p>
                      </div>
                      <Button variant="outline" size="sm">Выключено</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Экспорт данных</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-border hover:bg-accent">
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Экспорт в Excel
                    </Button>
                    <Button variant="outline" className="border-border hover:bg-accent">
                      <Icon name="FileText" className="mr-2 h-4 w-4" />
                      Экспорт в PDF
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;