import produce from 'immer';
import {
    createSignup,
    createLogin,
    createSecurityQuestion,
    createForgotPassword
} from '../actions/signup';


export const initialState = {
    isSignup: false,
    isLoader:false,
    user:null,
    isLoggedIn:false,
    isSecurityQuestionDone:false,
    isForgotPassword:null
};

export default (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case createSignup.TRIGGER: {
                draft.isLoader = true;
                draft.user = null;
           
                break;
            }
            case createSignup.SUCCESS: {
                draft.isLoader = true;
                draft.user = action.payload;;
                break;
            }
            case createLogin.TRIGGER: {
                draft.isLoader = true;
                draft.user = null;
                break;
            }
            case createLogin.SUCCESS: {
                draft.isLoader = true;
                draft.user = action.payload;;
                draft.isLoggedIn = true
                break;
            }
            case createSecurityQuestion.TRIGGER: {
                draft.isLoader = true;
                break;
            }
            case createSecurityQuestion.SUCCESS: {
                draft.isLoader = true;
                draft.user = action.payload;;
                draft.isSecurityQuestionDone = true
                break;
            }
            default: {
                break;
            }
        }
    });


    