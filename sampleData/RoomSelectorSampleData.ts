import { House } from '@/types/House';
import { Room } from '@/types/Room';
import { Location } from '@/types/Location';
import { LoggedItem } from '@/types/LoggedItem';

const house: House = {
    id: 1,
    title: 'Sunnydale Residence',
    rooms: [], // Will populate below
};

const rooms: Room[] = [
    {
        id: 1,
        title: 'Living Room',
        locations: [], // Will populate below
        house: 1,
    },
    {
        id: 2,
        title: 'Kitchen',
        locations: [],
        house: 1,
    },
    {
        id: 3,
        title: 'Bedroom',
        locations: [],
        house: 1,
    },
];

house.rooms = rooms;

const locations: Location[] = [
    // Living Room Locations
    {
        id: 1,
        title: 'Sofa Area',
        room: rooms[0].id,
        loggedItems: [], // Assuming empty initially
    },
    {
        id: 2,
        title: 'TV Stand',
        room: rooms[0].id,
        loggedItems: [],
    },
    {
        id: 3,
        title: 'Coffee Table',
        room: rooms[0].id,
        loggedItems: [],
    },
    // Kitchen Locations
    {
        id: 4,
        title: 'Pantry',
        room: rooms[1].id,
        loggedItems: [],
    },
    {
        id: 5,
        title: 'Refrigerator',
        room: rooms[1].id,
        loggedItems: [],
    },
    {
        id: 6,
        title: 'Kitchen Island',
        room: rooms[1].id,
        loggedItems: [],
    },
    // Bedroom Locations
    {
        id: 7,
        title: 'Wardrobe',
        room: rooms[2].id,
        loggedItems: [],
    },
    {
        id: 8,
        title: 'Nightstand',
        room: rooms[2].id,
        loggedItems: [],
    },
    {
        id: 9,
        title: 'Dresser',
        room: rooms[2].id,
        loggedItems: [],
    },
];

// Assign locations to their respective rooms

export { house, rooms, locations };
