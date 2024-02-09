import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { appReducer } from './features/app/appSlice';

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Create store
export const store = configureStore({
    reducer: {
        // Add reducers here
        app: appReducer,
    },
});

// Define custom hooks
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
