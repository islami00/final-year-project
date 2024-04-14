import { type ComboboxStore } from '@mantine/core';
export interface TargetCtx {
  combobox: ComboboxStore;
  onClick: VoidFunction;
}
export function getTargetCtx(comboboxStore: ComboboxStore): TargetCtx {
  return {
    combobox: comboboxStore,
    onClick: () => comboboxStore.toggleDropdown(),
  };
}
