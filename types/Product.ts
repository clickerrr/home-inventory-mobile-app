import { LoggedItem } from './LoggedItem';

export type Product = {
    upca: string;
    title: string;
    containerType: string;
    nutritionalInformation: number;
    loggedItems: LoggedItem[];
};
