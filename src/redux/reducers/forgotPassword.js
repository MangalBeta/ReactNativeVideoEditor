import produce from 'immer';
import {
    createForgotPassword,
} from '../actions/signup';


export const initialState = {
    isLoader:false,
    isForgotPassword:null
};

export default (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case createForgotPassword.TRIGGER: {
                draft.isLoader = true;
                draft.isForgotPassword = null;
                break;
            }
            case createForgotPassword.SUCCESS: {
                draft.isLoader = false;
                draft.isForgotPassword = action.payload;
                break;
            }
            default: {
                break;
            }
        }
    });


    