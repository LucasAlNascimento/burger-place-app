import { MenuItem } from "./menu";

export interface BasketItem extends MenuItem {
    quantity: number;
}

export interface BasketState {
    items: BasketItem[];
}
