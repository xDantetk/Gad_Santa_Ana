import {SHARED_STATE_NAME} from "./shared/shared.selector";
import {SharedState} from "./shared/shared.state";
import {sharedReducer} from "./shared/shared.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState,
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
  [SHARED_STATE_NAME]: sharedReducer
}
