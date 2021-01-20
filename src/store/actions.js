/* eslint-disable prettier/prettier */
import * as Actions from './constants/constants';
import {API_KEY,GET_URL} from '@env';

export const fetchProducts = (text) => {
    return async (dispatch, getState) => {
        if (getState().news.searching) {
            getState().news.news = [];
            getState().news.nbOfPages = 0;
        }
        try {
            const response = await fetch(
                `${GET_URL}=${text}&page=${getState().news.nbOfPages}&api-key=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Something Went Wrong!');
            }
            const resData = await response.json();
            dispatch({ type: Actions.SET_NEWS, news: resData.response.docs });
        }
        catch (err) {
            alert(err);
        }
    };
};


export const newData = (search) => {
    return { type: Actions.SEARCH_NEWS, searching: search };
};

export const addNews = () => {
    return { type: Actions.ADD_NEWS };
};



