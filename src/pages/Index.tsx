import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Employee, Shift, ShiftType } from '@/types/employee';
import DashboardHeader from '@/components/DashboardHeader';
import EmployeesTab from '@/components/EmployeesTab';
import ScheduleTab from '@/components/ScheduleTab';
import ShiftsTab from '@/components/ShiftsTab';
import StatisticsTab from '@/components/StatisticsTab';
import SettingsTab from '@/components/SettingsTab';

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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader employees={employees} onAutoDistribute={autoDistributeShifts} />

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

          <TabsContent value="employees">
            <EmployeesTab employees={employees} />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleTab 
              employees={employees} 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </TabsContent>

          <TabsContent value="shifts">
            <ShiftsTab employees={employees} />
          </TabsContent>

          <TabsContent value="statistics">
            <StatisticsTab employees={employees} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
