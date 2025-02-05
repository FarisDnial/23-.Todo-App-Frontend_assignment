import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import { combineReducers } from 'redux';
import bookReducer from './feature/bookSlice'; // Update with your reducer path

const persistConfig = {
    key: 'root',
    storage, // Choose localStorage or sessionStorage here
};

const rootReducer = combineReducers({
    book: bookReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
