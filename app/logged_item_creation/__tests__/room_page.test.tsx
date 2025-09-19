import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import RoomPage from '@/app/logged_item_creation/room_page';
import { getRequest } from '@/utils/RequestHandler';

jest.mock('@/utils/RequestHandler', () => ({
    getRequest: jest.fn().mockResolvedValue([
        {
            id: 10,
            title: 'Test House',
            rooms: [
                {
                    id: 32,
                    title: 'fhdhdhhd',
                    locations: [],
                },
                {
                    id: 29,
                    title: 'a',
                    locations: [
                        {
                            id: 23,
                            title: 'no',
                            loggedItems: [],
                        },
                        {
                            id: 22,
                            title: 'ya',
                            loggedItems: [],
                        },
                    ],
                },
            ],
            users: [
                {
                    id: 1,
                    firstName: null,
                    lastName: null,
                    email: 'email@gmail.com',
                    username: 'username',
                    password: '$2a$10$NLrM6QC1N6yKlftYlnTsaOjjd5cwlSAqMXJcFL5Dj95hLjVvidEJO',
                    admin: false,
                },
            ],
            inventories: [],
        },
        {
            id: 1,
            title: 'Swiech House',
            rooms: [
                {
                    id: 5,
                    title: 'Living Room',
                    locations: [
                        {
                            id: 10,
                            title: 'Glass Table',
                            loggedItems: [],
                        },
                        {
                            id: 13,
                            title: 'Alcohol Shelves',
                            loggedItems: [],
                        },
                        {
                            id: 11,
                            title: 'Cabinet',
                            loggedItems: [],
                        },
                        {
                            id: 9,
                            title: 'Dining Table',
                            loggedItems: [],
                        },
                        {
                            id: 12,
                            title: 'Couch',
                            loggedItems: [],
                        },
                    ],
                },
                {
                    id: 1,
                    title: 'Kitchen',
                    locations: [
                        {
                            id: 1,
                            title: 'Refrigerator',
                            loggedItems: [
                                {
                                    id: 23,
                                    dateLogged: '2025-09-14',
                                    expirationDate: '2025-09-21',
                                    consumeByDate: '2025-09-21',
                                },
                                {
                                    id: 32,
                                    dateLogged: '2025-09-18',
                                    expirationDate: '2025-09-25',
                                    consumeByDate: '2025-09-25',
                                },
                                {
                                    id: 27,
                                    dateLogged: '2025-09-16',
                                    expirationDate: '2025-09-23',
                                    consumeByDate: '2025-09-23',
                                },
                                {
                                    id: 26,
                                    dateLogged: '2025-09-16',
                                    expirationDate: '2025-09-23',
                                    consumeByDate: '2025-09-23',
                                },
                                {
                                    id: 25,
                                    dateLogged: '2025-09-16',
                                    expirationDate: '2025-09-23',
                                    consumeByDate: '2025-09-23',
                                },
                                {
                                    id: 24,
                                    dateLogged: '2025-09-14',
                                    expirationDate: '2025-09-21',
                                    consumeByDate: '2025-09-21',
                                },
                                {
                                    id: 31,
                                    dateLogged: '2025-09-16',
                                    expirationDate: '2025-09-23',
                                    consumeByDate: '2025-09-23',
                                },
                            ],
                        },
                        {
                            id: 14,
                            title: 'Coffee Bar',
                            loggedItems: [],
                        },
                        {
                            id: 8,
                            title: 'Mini Fridge',
                            loggedItems: [
                                {
                                    id: 15,
                                    dateLogged: '2025-09-05',
                                    expirationDate: '2025-09-12',
                                    consumeByDate: '2025-09-12',
                                },
                                {
                                    id: 14,
                                    dateLogged: '2025-09-05',
                                    expirationDate: '2025-09-12',
                                    consumeByDate: '2025-09-12',
                                },
                                {
                                    id: 16,
                                    dateLogged: '2025-09-05',
                                    expirationDate: '2025-09-12',
                                    consumeByDate: '2025-09-12',
                                },
                                {
                                    id: 13,
                                    dateLogged: '2025-09-05',
                                    expirationDate: '2025-09-12',
                                    consumeByDate: '2025-09-12',
                                },
                            ],
                        },
                        {
                            id: 17,
                            title: 'Cabinet 3',
                            loggedItems: [],
                        },
                        {
                            id: 15,
                            title: 'Cabinet 1',
                            loggedItems: [],
                        },
                        {
                            id: 18,
                            title: 'Cabinet 4',
                            loggedItems: [],
                        },
                        {
                            id: 16,
                            title: 'Cabinet 2',
                            loggedItems: [],
                        },
                        {
                            id: 2,
                            title: 'Kitchen Counter',
                            loggedItems: [
                                {
                                    id: 22,
                                    dateLogged: '2025-09-14',
                                    expirationDate: '2025-09-21',
                                    consumeByDate: '2025-09-21',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 6,
                    title: 'Pantry (Under Stairs)',
                    locations: [
                        {
                            id: 19,
                            title: 'Top Shelf',
                            loggedItems: [],
                        },
                        {
                            id: 20,
                            title: 'Bottom Shelf',
                            loggedItems: [],
                        },
                    ],
                },
                {
                    id: 2,
                    title: "Bartek's Bedroom",
                    locations: [
                        {
                            id: 4,
                            title: 'Wardrobe',
                            loggedItems: [],
                        },
                        {
                            id: 6,
                            title: 'Closet',
                            loggedItems: [],
                        },
                        {
                            id: 5,
                            title: 'Dresser',
                            loggedItems: [
                                {
                                    id: 4,
                                    dateLogged: '2025-08-21',
                                    expirationDate: '2025-08-28',
                                    consumeByDate: '2025-08-28',
                                },
                                {
                                    id: 3,
                                    dateLogged: '2025-07-16',
                                    expirationDate: '2025-07-23',
                                    consumeByDate: '2025-07-23',
                                },
                            ],
                        },
                        {
                            id: 7,
                            title: 'Desk',
                            loggedItems: [
                                {
                                    id: 11,
                                    dateLogged: '2025-08-31',
                                    expirationDate: '2025-09-07',
                                    consumeByDate: '2025-09-07',
                                },
                                {
                                    id: 12,
                                    dateLogged: '2025-08-31',
                                    expirationDate: '2025-09-07',
                                    consumeByDate: '2025-09-07',
                                },
                            ],
                        },
                    ],
                },
            ],
            users: [
                {
                    id: 1,
                    firstName: null,
                    lastName: null,
                    email: 'email@gmail.com',
                    username: 'username',
                    password: '$2a$10$NLrM6QC1N6yKlftYlnTsaOjjd5cwlSAqMXJcFL5Dj95hLjVvidEJO',
                    admin: false,
                },
                {
                    id: 5,
                    firstName: null,
                    lastName: null,
                    email: 'email1@gmail.com',
                    username: 'username1',
                    password: '$2a$10$jN9/wBU.NAz4aP.SqUXtMeqaBGlULlz/mbM6VmdXmAhVBXWX9eKSS',
                    admin: false,
                },
            ],
            inventories: [
                {
                    id: 3,
                    title: 'yep',
                    loggedItems: [
                        {
                            id: 31,
                            dateLogged: '2025-09-16',
                            expirationDate: '2025-09-23',
                            consumeByDate: '2025-09-23',
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'hi',
                    loggedItems: [],
                },
                {
                    id: 4,
                    title: 'teat',
                    loggedItems: [],
                },
                {
                    id: 1,
                    title: null,
                    loggedItems: [
                        {
                            id: 26,
                            dateLogged: '2025-09-16',
                            expirationDate: '2025-09-23',
                            consumeByDate: '2025-09-23',
                        },
                        {
                            id: 24,
                            dateLogged: '2025-09-14',
                            expirationDate: '2025-09-21',
                            consumeByDate: '2025-09-21',
                        },
                        {
                            id: 11,
                            dateLogged: '2025-08-31',
                            expirationDate: '2025-09-07',
                            consumeByDate: '2025-09-07',
                        },
                        {
                            id: 13,
                            dateLogged: '2025-09-05',
                            expirationDate: '2025-09-12',
                            consumeByDate: '2025-09-12',
                        },
                        {
                            id: 22,
                            dateLogged: '2025-09-14',
                            expirationDate: '2025-09-21',
                            consumeByDate: '2025-09-21',
                        },
                        {
                            id: 14,
                            dateLogged: '2025-09-05',
                            expirationDate: '2025-09-12',
                            consumeByDate: '2025-09-12',
                        },
                        {
                            id: 16,
                            dateLogged: '2025-09-05',
                            expirationDate: '2025-09-12',
                            consumeByDate: '2025-09-12',
                        },
                        {
                            id: 12,
                            dateLogged: '2025-08-31',
                            expirationDate: '2025-09-07',
                            consumeByDate: '2025-09-07',
                        },
                        {
                            id: 4,
                            dateLogged: '2025-08-21',
                            expirationDate: '2025-08-28',
                            consumeByDate: '2025-08-28',
                        },
                        {
                            id: 25,
                            dateLogged: '2025-09-16',
                            expirationDate: '2025-09-23',
                            consumeByDate: '2025-09-23',
                        },
                        {
                            id: 3,
                            dateLogged: '2025-07-16',
                            expirationDate: '2025-07-23',
                            consumeByDate: '2025-07-23',
                        },
                        {
                            id: 27,
                            dateLogged: '2025-09-16',
                            expirationDate: '2025-09-23',
                            consumeByDate: '2025-09-23',
                        },
                        {
                            id: 32,
                            dateLogged: '2025-09-18',
                            expirationDate: '2025-09-25',
                            consumeByDate: '2025-09-25',
                        },
                        {
                            id: 23,
                            dateLogged: '2025-09-14',
                            expirationDate: '2025-09-21',
                            consumeByDate: '2025-09-21',
                        },
                        {
                            id: 15,
                            dateLogged: '2025-09-05',
                            expirationDate: '2025-09-12',
                            consumeByDate: '2025-09-12',
                        },
                    ],
                },
            ],
        },
    ]),
}));

describe('<RoomPage />', () => {
    beforeEach(() => {
        render(<RoomPage />);
    });
    test('Text Renders Correctly', async () => {
        expect(screen.getByText('Select House')).toBeTruthy();
    });

    test('getRequest was called', async () => {
        await waitFor(() => {
            expect(getRequest).toHaveBeenCalled();
        });
    });
    test('houses are set to the mocked data', async () => {
        await waitFor(() => {
            expect(getRequest).toHaveBeenCalled();
        });

        const dropdown = screen.getByTestId('houseDropdown');
        fireEvent.press(dropdown);

        const houseItem = screen.getByTestId('houseDropdownItem');
        fireEvent.press(houseItem);
    });
});
