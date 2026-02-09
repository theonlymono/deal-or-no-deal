export const MONEY_VALUES = [
  0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 
  1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000
];

export const ROUND_STRUCTURE = [
  { round: 1, casesToOpen: 6 },
  { round: 2, casesToOpen: 5 },
  { round: 3, casesToOpen: 4 },
  { round: 4, casesToOpen: 3 },
  { round: 5, casesToOpen: 2 },
  { round: 6, casesToOpen: 1 },
  { round: 7, casesToOpen: 1 },
  { round: 8, casesToOpen: 1 },
  { round: 9, casesToOpen: 1 },
];

export type GameState = 'PICK_CASE' | 'OPEN_CASES' | 'BANKER_OFFER' | 'GAME_OVER' | 'DEAL_ACCEPTED' | 'NO_DEAL_END';

export const RISK_FACTORS: Record<number, number> = {
  1: 0.20,
  2: 0.30,
  3: 0.40,
  4: 0.50,
  5: 0.60,
  6: 0.70,
  7: 0.80,
  8: 0.90,
  9: 0.95, 
};
