import { LoggedItem } from './LoggedItem';
import { Room } from './Room';

export type Location = {
    id: number;
    title: string;
    room: Room; // Assuming `Room` type exists
    loggedItems: LoggedItem[]; // Assuming `LoggedItem` type exists
};
