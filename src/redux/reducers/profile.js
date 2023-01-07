import produce from 'immer';
import {
    getUserProfile,
    createlogOutUser
} from '../actions/profile';


export const initialState = {
    userData:null

};

export default (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case getUserProfile.TRIGGER: {
                draft.isLoader = true;
                draft.userData = null;
                break;
            }
            case getUserProfile.SUCCESS: {
                draft.isLoader = true;
                draft.userData = action.payload;;
                break;
            }
            case createlogOutUser.SUCCESS: {
                draft.userData =null;
                break;
            }
            default: {
                break;
            }
        }
    });


    