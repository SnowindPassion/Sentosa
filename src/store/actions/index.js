import { SET_FROM, SET_TO } from "./actionType"

export const getSetFromAction = (data) => {
    return {type: SET_FROM, data};
}

export const getSetToAction = (data) => {
    return {type: SET_TO, data};
}