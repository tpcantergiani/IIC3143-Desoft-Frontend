import { combineReducers } from 'redux';

import { userReducer } from './slices/userSlice';
import { featureReducer } from './slices/featuresSlice';

const rootReducer = combineReducers({
  user: userReducer,
  features: featureReducer,
});

export default rootReducer;
