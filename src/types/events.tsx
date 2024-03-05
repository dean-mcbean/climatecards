export type HazardEvent = {
  id: number;
  type: 'storm' | 'tsunami' | 'earthquake';
  name: string;
  description: string;
  effect: string;
  start_turn: number;
  end_turn: number;
  color: string;
  icon: JSX.Element;
  duration_range: [number, number];
};