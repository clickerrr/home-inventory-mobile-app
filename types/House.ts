import { Inventory } from './Inventory';
import { Room } from './Room';

export type House = {
    id: number;
    title: string;
    rooms: Room[];
    inventories: Inventory[];
};
