import { House } from './House';
import { Location } from './Location';

export type Room = {
    id: number;
    title: string;
    locations: Location[]; // Assuming `Location` type exists
    house: House; // Assuming `House` type exists
};
