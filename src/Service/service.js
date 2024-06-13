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
export const getDataAboutUser = async (user_token) => {
    try {
        const response = await axios.get(`smartrent-b950f278fa06.herokuapp.com/api/user/${user_token}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};