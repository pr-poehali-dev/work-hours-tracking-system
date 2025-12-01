export type Employee = {
  id: number;
  name: string;
  position: string;
  status: 'active' | 'vacation' | 'sick' | 'dayoff';
  hoursThisWeek: number;
  hoursThisMonth: number;
};

export type ShiftType = 'day' | 'night' | 'off' | 'vacation' | 'sick';

export type Shift = {
  employeeId: number;
  date: Date;
  type: ShiftType;
  hours: number;
};

export const getStatusColor = (status: Employee['status']) => {
  switch (status) {
    case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'vacation': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'sick': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'dayoff': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  }
};

export const getStatusLabel = (status: Employee['status']) => {
  switch (status) {
    case 'active': return 'Работает';
    case 'vacation': return 'Отпуск';
    case 'sick': return 'Больничный';
    case 'dayoff': return 'Выходной';
  }
};

export const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('');
};
