import {
  ADD_TODO,
  UPDATE_TODO,
  LIST_TODOS,
  DELETE_TODO
  } from './actionType'

export const addTodo = (data) => {
  console.log(new Date())
  return function (dispatch) {
    dispatch(addNewTodo(data))
    return Promise.resolve({status: true, msg: 'Added successfuly'})
  }
}

export const updateTodo = (data) => {
  console.log(new Date())
  return function (dispatch) {
    dispatch(updateNewTodo(data))
    return Promise.resolve({status: true, msg: 'Added successfuly'})
  }
}

export const getTodos = () => {
  console.log(new Date())
  return function (dispatch) {
    let todosArray = [];
    let todosData = localStorage.getItem('todos')
    if(todosData!=null) {
      todosArray = JSON.parse(todosData);
    }
    dispatch(listTodos(todosArray))
    return Promise.resolve({status: true, data: todosArray, msg: 'Listed successfuly'})
  }
}

export const addNewTodo = payload => ({type: ADD_TODO, payload})
export const updateNewTodo = payload => ({type: UPDATE_TODO, payload})
export const listTodos = payload => ({type: LIST_TODOS, payload})
export const deleteTodo = payload => ({type: DELETE_TODO, payload})