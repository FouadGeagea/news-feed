/* eslint-disable prettier/prettier */
import News from '../models/news';
import { ADD_NEWS, SEARCH_NEWS, SET_NEWS } from './constants/constants';

const initialState = {
    news: [],
    searching: false,
    nbOfPages: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            let fillNews = [];
            const loadedNews = action.news.map(item => item._id);
            for (let i = 0; i < loadedNews.length; i++) {
                fillNews.push(new News(
                    action.news.map(item => item._id)[i] + Math.random(),
                    action.news.map(item => item.abstract)[i],
                    action.news.map(item => item.lead_paragraph)[i],
                    action.news.map(item => item.web_url)[i],
                    action.news.map(item => item.multimedia.map(image => 'https://static01.nyt.com/' + image.url)[i])[i]
                ));
            }
            return {
                ...state,
                news: state.news.concat(fillNews),
            };
        case SEARCH_NEWS:
            return {
                ...state,
                searching: action.searching,
            };
        case ADD_NEWS:
            const page = state.nbOfPages + 1;
            return {
                ...state,
                nbOfPages: page,

            };
        default:
            return state;
    }
};

export default reducer;
