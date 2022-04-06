import { Token } from './../../user';
import { Action } from '../actions';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_ADD, USER_DELETE, USER_UPDATE, TOKEN_ADD } from '../actions/user-action';
import {User} from '../../user';
export interface UserReducerState{
    loading: boolean;
    loaded: boolean;
    users: User[];
    token: Token;
}
const initialState: UserReducerState = {
    loading: false,
    loaded: false,
    users: [],
    token: {id: '', email: ''}
};
export function UserReducer(state = initialState, action: Action): UserReducerState {
    switch (action.type) {
      case USER_LIST_REQUEST: {
        return {...state, loading: true};
      }
      case USER_DELETE: {
        const id = action.payload;
        const users = state.users.filter(elem => elem._id !== id);
        return {...state, ...{users}};
      }
      case USER_UPDATE: {
        const user = action.payload;
        const index = state.users.findIndex(({ _id }) => _id === user.id);
        const list = [...state.users];
        list[index] = action.payload;
        const users = list;
        return {...state, ...{users}};
      }
      case USER_ADD: {
        const users = state.users.concat(action.payload);
        return {...state, ...{users}};
      }
      case TOKEN_ADD: {
        const token = action.payload;
        return {...state, token};
      }
    //   case USER_LIST_ERROR: {
    //     return {...state, error: true, loading: false};
    //   }
      case USER_LIST_SUCCESS: {
        // const updateUsers = state.users.concat(action.payload.data);
        const updateUsers = action.payload.data;
        return {...state, loading: false, loaded: true, users: updateUsers };
      }
      default: {
        return state;
      }
    }
  }


export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;
export const getToken = (state: UserReducerState) => state.token;
