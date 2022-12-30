import {createReducer, on} from "@ngrx/store";
import {initialState, SharedState} from "./shared.state";
import {setLoadingSpinner} from "./shared.actions";

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state: SharedState, action) => {
    return {
      ...state,
      showLoading: action.status
    }
  }),
)

export function sharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
