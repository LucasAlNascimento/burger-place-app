import { MenuItem } from "./Menu";

export interface MenuDetailState {
    isOpen: boolean;
    selectedItem: MenuItem | null;
    selectedModifiers: { [modifierId: number]: number };
  }