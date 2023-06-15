import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;