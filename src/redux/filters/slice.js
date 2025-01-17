import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        location: '',
        vehicleType: '',
        equipment: {},
    },
    reducers: {
        setFilters(state, action) {
            return action.payload;
        },
    },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
