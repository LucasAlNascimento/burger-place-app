import { ReactNode } from "react";

export interface Image {
    id: number;
    image: string;
}

export interface Modifier {
    selectedOptionId: ReactNode;
    id: number;
    name: string;
    minChoices: number;
    maxChoices: number;
    items: MenuItem[];
}

export interface ModifierItem {
    id: number;
    name: string;
    price: number;
    maxChoices: number;
    position: number;
    visible: number;
    availabilityType: string;
    available: boolean;
}

export interface ModifierOption {
    id: number;
    name: string;
    price: number;
  }

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    alcoholic: number;
    price: number;
    position: number;
    visible: number;
    availabilityType: string;
    sku: string;
    images: Image[];
    available: boolean;
    modifiers?: Modifier[];
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
