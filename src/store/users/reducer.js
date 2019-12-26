import { ADD, UPDATE, LIST_USERS, DELETE } from "./actionType";

export const initialState = {
  usersArray: []
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD:
      let usersArray = [];
      let usersData = localStorage.getItem('users')
      if(usersData!=null) {
        usersArray = JSON.parse(usersData);
      }
      let usersNewData = {
        ...payload,
        id: (usersArray.length+1).toString(),
      }
      let newUsersArray = [...usersArray, usersNewData]
      localStorage.setItem('users', JSON.stringify(newUsersArray));
      return {
        ...state,
        usersArray: newUsersArray
      };
    case UPDATE: {
      let usersArray = [];
      let usersData = localStorage.getItem('users')
      if(usersData!=null) {
        usersArray = JSON.parse(usersData);
      }
      let newUsersArray = usersArray.map((row, index) => parseInt(row.id) === parseInt(payload.id)?payload:row)
      localStorage.setItem('users', JSON.stringify(newUsersArray));
      return {
        ...state,
        usersArray: newUsersArray
      };
    }
    case DELETE:{
      let usersArray = [];
      let usersData = localStorage.getItem('users')
      if(usersData!=null) {
        usersArray = JSON.parse(usersData);
      }
      let newUsersArray = usersArray.filter((item) => item.id !== payload.id);
      localStorage.setItem('users', JSON.stringify(newUsersArray));
      return {
        ...state,
        usersArray: newUsersArray,
      };
    }
      
    case LIST_USERS:
      return {
        ...state,
        usersArray: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
