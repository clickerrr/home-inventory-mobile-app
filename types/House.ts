import { Inventory } from './Inventory';
import { Room } from './Room';

export type House = {
    id: number;
    title: string;
    rooms: Room[]; // Assuming `Room` type exists
    inventories: Inventory[];
};
