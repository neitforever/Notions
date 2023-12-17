import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user/reducer";
import { notesReducer } from "./notes/reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  notes: notesReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist:['user']
  },    
  rootReducer
);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
  
);
export default store;

export const persistor = persistStore(store);
