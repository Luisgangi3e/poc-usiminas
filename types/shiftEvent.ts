export type ShiftEventType =
  | 'shift_start'
  | 'shift_end'
  | 'production'
  | 'maintenance'
  | 'alert'
  | 'quality'
  | 'break'
  | 'incident';

export interface ShiftEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: ShiftEventType;
  shift: string;
  operator?: string;
  duration?: number;
  relatedMachineId?: string;
}
