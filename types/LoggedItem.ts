import { Inventory } from './Inventory';
import { Location } from './Location';
import { Product } from './Product';

export type LoggedItem = {
    id: number;
    dateLogged: string; // ISO 8601 date string (e.g., "yyyy-MM-dd")
    expirationDate: string;
    consumeByDate: string;
    product: Product; // Assuming `Product` type exists
    location: Location; // Assuming `Location` type exists
    inventory: Inventory; // Assuming `Inventory` type exists
};
