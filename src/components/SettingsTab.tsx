import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const SettingsTab = () => {
  return (
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
  );
};

export default SettingsTab;
