import { combineReducers } from 'redux';
import UserSlice from './UserSlice';


export default combineReducers({
    user: UserSlice,

});