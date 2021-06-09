/* Went ahead and typed only the objects that I used */
export interface EventResponse {
  status: string;
  event: Event;
}

export interface Event {
  id: string;
  name: string;
  tradeables: Tradeable[];
}

export interface Tradeable {
  id: string;
  object: string;
  league: string;
  entity_id: string;
  event_id: string;
  focus_game_id: string;
  shares: number;
  amount_completed?: number;
  price: Price;
  rank: Rank;
  points: Points;
  entity: Entity;
}

export interface Price {
  ipo?: number;
  last?: number;
  estimated?: number;
  bid?: number;
  ask?: number;
}

export interface Rank {
  projected: number;
  projected_live: number;
  scored: number;
  price: number;
}

export interface Points {
  projected: number;
  projected_live?: number;
  scored?: number;
}

export interface Entity {
  id: string;
  object: string;
  name: string;
  league: string;
  is_simulated: boolean;
  image_url: string;
  current_team_id: string;
  height: number;
  status: string;
  weight: number;
  college: string;
  position: string;
  birthdate: string;
  last_name: string;
  first_name: string;
  rookie_year?: number;
  current_team: string;
  jersey_number: string;
  preferred_name: string;
}

export type SortType = keyof Rank;

export type SortOrder = 'asc' | 'desc';
