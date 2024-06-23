import { MenuItem } from "./Menu";

export interface BasketItem extends MenuItem {
    quantity: number;
}

export interface BasketState {
    items: BasketItem[];
}
