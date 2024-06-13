// api.js
import axios from 'axios';

export const getDataAboutUser = async (user_token) => {
    try {
        const response = await axios.get(`smartrent-b950f278fa06.herokuapp.com/api/user/${user_token}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};
export const FilterPrice = async (maxPrice) => {
    try {
        const response = await axios.get(`smartrent-b950f278fa06.herokuapp.com/api/user/${maxPrice}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

export const getAllSities = async () => {
    try {
        const response = await axios.get(`https://smartrent-b950f278fa06.herokuapp.com/api/rent/house`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};
export const getSitiesByName = async (sityName,limit,offset) => {
    try {
        const response = await axios.get(`https://smartrent-b950f278fa06.herokuapp.com/api/rent/house/city/${sityName}?limit=${limit}&offset=${offset}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

export const getSityByCoordination = async (latitude,longitude) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};