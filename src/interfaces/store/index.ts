import { InventoryInterface } from 'interfaces/inventory';
import { SalesInterface } from 'interfaces/sales';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StoreInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory?: InventoryInterface[];
  sales?: SalesInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    sales?: number;
  };
}

export interface StoreGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
