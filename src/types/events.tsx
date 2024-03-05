export type HazardEvent = {
  id: number;
  type: 'storm' | 'tsunami';
  name: string;
  description: string;
  effect: string;
  start_turn: number;
  end_turn: number;
  icon: JSX.Element;
  duration_range: [number, number];
};