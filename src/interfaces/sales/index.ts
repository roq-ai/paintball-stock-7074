import { StoreInterface } from 'interfaces/store';
import { GetQueryInterface } from 'interfaces';

export interface SalesInterface {
  id?: string;
  number_of_players: number;
  paintballs_per_player: number;
  store_id?: string;
  created_at?: any;
  updated_at?: any;

  store?: StoreInterface;
  _count?: {};
}

export interface SalesGetQueryInterface extends GetQueryInterface {
  id?: string;
  store_id?: string;
}
