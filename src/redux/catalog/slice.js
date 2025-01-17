import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        location: '',
        vehicleType: '',
        equipment: [],
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setVehicleType: (state, action) => {
            state.vehicleType = action.payload;
        },
        toggleEquipment: (state, action) => {
            const index = state.equipment.indexOf(action.payload);
            if (index > -1) {
                state.equipment.splice(index, 1);
            } else {
                state.equipment.push(action.payload);
            }
        },
        resetFilters: (state) => {
            state.location = '';
            state.vehicleType = '';
            state.equipment = [];
        },
    },
});

export const { setLocation, setVehicleType, toggleEquipment, resetFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
