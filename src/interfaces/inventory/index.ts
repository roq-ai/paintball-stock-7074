import { StoreInterface } from 'interfaces/store';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  paintballs_in_stock: number;
  paintballs_used: number;
  store_id?: string;
  created_at?: any;
  updated_at?: any;

  store?: StoreInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  store_id?: string;
}
