import produce from 'immer';
import {
    submitOtpVerify,
} from '../actions/verification';


export const initialState = {
    isVerified: false,
    isLoader:false,
    user:null
    
};

export default (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case submitOtpVerify.TRIGGER: {
                draft.isLoader = true;
                draft.user = null;
                break;
            }
            case submitOtpVerify.SUCCESS: {
                draft.isLoader = true;
                draft.isVerified = true
                draft.user = action.payload;;
                break;
            }
            default: {
                break;
            }
        }
    });


    