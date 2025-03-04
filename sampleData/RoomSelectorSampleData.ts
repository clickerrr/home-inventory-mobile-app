import { House } from '@/types/House';
import { Room } from '@/types/Room';
import { Location } from '@/types/Location';
import { LoggedItem } from '@/types/LoggedItem';

let house: House = {
    id: 0,
    title: 'Sunnydale Residence',
    rooms: [0, 1, 2], // Will populate below
};

const rooms: Room[] = [
    {
        id: 0,
        title: 'Living Room',
        locations: [0, 1, 2], // Will populate below
        house: 1,
    },
    {
        id: 1,
        title: 'Kitchen',
        locations: [3, 4, 5],
        house: 1,
    },
    {
        id: 2,
        title: 'Bedroom',
        locations: [7, 8, 9],
        house: 1,
    },
];

const locations: Location[] = [
    // Living Room Locations
    {
        id: 0,
        title: 'Sofa Area',
        room: rooms[0].id,
        loggedItems: [], // Assuming empty initially
    },
    {
        id: 1,
        title: 'TV Stand',
        room: rooms[0].id,
        loggedItems: [],
    },
    {
        id: 2,
        title: 'Coffee Table',
        room: rooms[0].id,
        loggedItems: [],
    },
    // Kitchen Locations
    {
        id: 3,
        title: 'Pantry',
        room: rooms[1].id,
        loggedItems: [],
    },
    {
        id: 4,
        title: 'Refrigerator',
        room: rooms[1].id,
        loggedItems: [],
    },
    {
        id: 5,
        title: 'Kitchen Island',
        room: rooms[1].id,
        loggedItems: [],
    },
    // Bedroom Locations
    {
        id: 6,
        title: 'Wardrobe',
        room: rooms[2].id,
        loggedItems: [],
    },
    {
        id: 7,
        title: 'Nightstand',
        room: rooms[2].id,
        loggedItems: [],
    },
    {
        id: 8,
        title: 'Dresser',
        room: rooms[2].id,
        loggedItems: [],
    },
];

// Assign locations to their respective rooms

export { house, rooms, locations };
