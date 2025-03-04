import { Product } from '@/types/Product';

const productSampleData: Record<string, Product[]> = {
    '014668503001': [
        {
            upca: '014668503001',
            title: 'Mightiest Kiwi',
            containerType: 'OTHER',
            nutritionalInformation: 45, // Per serving (2 kiwis)
            loggedItems: [],
        },
    ],
    '028000743079': [
        {
            upca: '028000743079',
            title: "Nescafé Taster's Choice House Blend Instant Coffee, 14 oz",
            containerType: 'JAR',
            nutritionalInformation: 0, // Coffee is typically calorie-free
            loggedItems: [],
        },
    ],
    '030100784586': [
        {
            upca: '030100784586',
            title: "Jack Link's Original Beef Jerky, 2.85 oz",
            containerType: 'BAG',
            nutritionalInformation: 80, // Per serving
            loggedItems: [],
        },
    ],
    '048001711129': [
        {
            upca: '048001711129',
            title: 'Knorr Tomato Bouillon with Chicken Flavor, 7.9 oz',
            containerType: 'JAR',
            nutritionalInformation: 10, // Per serving
            loggedItems: [],
        },
    ],
    '0078742292892': [
        {
            upca: '0078742292892',
            title: "Member's Mark Roasted & Salted Pistachios, 1.36 kg",
            containerType: 'BAG',
            nutritionalInformation: 160, // Per serving
            loggedItems: [],
        },
    ],
    '044000051365': [
        {
            upca: '044000051365',
            title: 'Nabisco Wheat Thins Original Crackers, 9 oz',
            containerType: 'BOX',
            nutritionalInformation: 140, // Per serving
            loggedItems: [],
        },
    ],
    '073360237515': [
        {
            upca: '073360237515',
            title: 'LaCroix Lime Sparkling Water - 12 fl oz',
            containerType: 'CAN',
            nutritionalInformation: 0, // Sparkling water is typically calorie-free
            loggedItems: [],
        },
    ],
    '012993101619': [
        {
            upca: '012993101619',
            title: 'LaCroix Pamplemousse (Grapefruit) Sparkling Water - 12 fl oz',
            containerType: 'Can',
            nutritionalInformation: 0, // Sparkling water is typically calorie-free
            loggedItems: [],
        },
    ],
};
export default productSampleData;
