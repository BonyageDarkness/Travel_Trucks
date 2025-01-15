import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Указываем базовый URL для API
const BASE_URL = 'https://66f145b04153791915503ad9.mockapi.io';

// Получение списка кемперов
export const fetchCampers = createAsyncThunk(
    'catalog/fetchCampers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/campers`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Получение деталей конкретного кемпера
export const fetchCamperDetails = createAsyncThunk(
    'catalog/fetchCamperDetails',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/campers/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
