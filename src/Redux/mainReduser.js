import { getSityData } from "../API"

const ADD_CARD = 'ADD_CARD'
const CHENGE_INPUT ='CHENGE_INPUT' 
const GET_SITY_DATA = ' GET_SITY_DATA'
const DELETE_CARD = 'DELETE_CARD'
const CREATE_ID = 'CREATE_ID'

const defaultState = {
    cardList:[],
    inputValue:''
}

const rootReduser = (state=defaultState , action)=>{

    switch(action.type){
        case ADD_CARD:{
            return{
                ...state,
                cardList:[...state.cardList,action.card]
            }
        }
        case CHENGE_INPUT:{
           
            return{
                ...state,
                inputValue:action.inputValue
            }
        }
        case GET_SITY_DATA:{
            return{
                ...state,
                cardList:[...state.cardList,action.sity]
            }
        }
        case DELETE_CARD:{
            return{
                ...state,
                cardList:state.cardList.filter(card=>card.id!==action.id)
            }
        }
        case CREATE_ID:{
         
            return{
                ...state,
                cardList:state.cardList.map(card=>{
                    card.id=action.id
                    return card
                })
            }
        }
        default : return state 
    }
}

export const addCard=(card)=>{
    return{
        type:ADD_CARD,
        card
    }
}

export const onChengeInput = (inputValue)=>{
    return{
        type:CHENGE_INPUT,
        inputValue
    }
}

export const getSityAction = (sity)=>{
    return{
        type:GET_SITY_DATA,
        sity
    }
}

export const getSity =(sity)=>{
    return dispatch=>{
        getSityData(sity).then(data=>dispatch(getSityAction(data)))
    }
}

export const  deleteCard = (id)=>{
    return {
        type:DELETE_CARD,
        id
    }
}

export const createId = (id)=>{
    return{
        type:CREATE_ID,
        id
    }
}

export default rootReduser