import ENV from '../../env'
import * as Actions from './constants/constants'

export const fetchProducts = (text) => {
    return async (dispatch,getState) => {
        try {
            const response = await fetch(
                `${ENV.defURL}=${text}&page=${getState().news.nbOfPages}&api-key=${ENV.googleApiKey}`)
            if (!response.ok) {
                throw new Error('Something Went Wrong!')
            }

           const resData = await response.json(); 
            dispatch({ type: Actions.SET_NEWS, news: resData.response.docs })
        }
        catch (err) {
            alert(err)
        }
    }
}


export const newData = (search) => {
    return { type: Actions.SEARCH_NEWS, searching: search }
}

export const addNews= ()=>{
    return{type:Actions.ADD_NEWS}
}



