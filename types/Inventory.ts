import { LoggedItem } from './LoggedItem';

export type Inventory = {
    id: number;
    title: string;
    loggedItems: LoggedItem[]; // Assuming `LoggedItem` type exists
};
