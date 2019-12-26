import { ADD_TODO, UPDATE_TODO, LIST_TODOS, DELETE_TODO } from "./actionType";

export const initialState = {
  todosArray: []
};

const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      let todosArray = [];
      let todosData = localStorage.getItem('todos')
      if(todosData!=null) {
        todosArray = JSON.parse(todosData);
      }
      let todosNewData = {
        ...payload,
        id: (todosArray.length+1).toString(),
      }
      let newTodosArray = [...todosArray, todosNewData]
      localStorage.setItem('todos', JSON.stringify(newTodosArray));
      return {
        ...state,
        todosArray: newTodosArray
      };
    case UPDATE_TODO: {
      let todosArray = [];
      let todosData = localStorage.getItem('todos')
      if(todosData!=null) {
        todosArray = JSON.parse(todosData);
      }
      let newTodosArray = todosArray.map((row, index) => parseInt(row.id) === parseInt(payload.id)?payload:row)
      localStorage.setItem('todos', JSON.stringify(newTodosArray));
      return {
        ...state,
        todosArray: newTodosArray
      };
    }
    case DELETE_TODO:{
      let todosArray = [];
      let todosData = localStorage.getItem('todos')
      if(todosData!=null) {
        todosArray = JSON.parse(todosData);
      }
      let newTodosArray = todosArray.filter((item) => item.id !== payload.id);
      localStorage.setItem('todos', JSON.stringify(newTodosArray));
      return {
        ...state,
        todosArray: newTodosArray,
      };
    }
      
    case LIST_TODOS:
      return {
        ...state,
        todosArray: payload,
      };
    default:
      return state;
  }
};

export default todosReducer;
