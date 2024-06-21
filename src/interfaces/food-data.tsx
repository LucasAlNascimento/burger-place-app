export interface MenuItem {
    id?: number;
    name: string;
    description: string | null;
    alcoholic: number;
    price: number;
    position: number;
    visible: number;
    availabilityType: string;
    sku: string;
    images: string;
    available: boolean;
    modifiers?: Modifier[];
}

export interface Image {
    id: number;
    image: string;
}

export interface Modifier {
    id: number;
    name: string;
    minChoices: number;
    maxChoices: number;
    items: MenuItem[];
}

export interface Section {
    id: number;
    name: string;
    description: string | null;
    position: number;
    visible: number;
    images: Image[];
    items: MenuItem[];
}

export interface Menu {
    id: number;
    name: string;
    type: string;
    collapse: number;
    sections: Section[];
}

