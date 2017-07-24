import {INCREMENT, DELETE_ARTICLE, FILTER_ARTICLE, FILTER_DATE} from '../constants'

export function increment() {
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function filterArticles(filteredArticles) {
    return {
        type: FILTER_ARTICLE,
        payload: { filteredArticles }
    }
}

export function filterDate(date) {
    return {
        type: FILTER_DATE,
        payload: { date }
    }
}