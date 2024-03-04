export type HazardEvent = {
  id: number;
  type: 'storm';
  name: string;
  description: string;
  effect: string;
  start_turn: number;
  end_turn: number;
  icon: JSX.Element;
};