export type LoggedItem = {
    id: number;
    dateLogged: string; // ISO 8601 date string (e.g., "yyyy-MM-dd")
    expirationDate: string;
    consumeByDate: string;
    product: string; // Assuming `Product` type exists
    location: number; // Assuming `Location` type exists
    inventory: number; // Assuming `Inventory` type exists
};
