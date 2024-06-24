import { MenuItem } from "./menu";

export interface MenuDetailState {
    isOpen: boolean;
    selectedItem: MenuItem | null;
    selectedModifiers: { [modifierId: number]: number };
  }