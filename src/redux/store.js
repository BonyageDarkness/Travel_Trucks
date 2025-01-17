import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters/slice';

const store = configureStore({
    reducer: {
        filters: filtersReducer,
    },
});

export default store;
