import {
  type AddFilterFilterState,
  type AddFilterActions,
} from './AddFilter.types';

export function addFilterReducer(
  state: AddFilterFilterState,
  action: AddFilterActions
): AddFilterFilterState {
  switch (action.type) {
    case 'close':
      return { stage: 0 };
    case 'select':
      return { stage: 1, filter: action.filter };
    default:
      return state;
  }
}
