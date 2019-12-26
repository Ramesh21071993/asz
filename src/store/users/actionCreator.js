import {
  ADD,
  UPDATE,
  LIST_USERS,
  DELETE
  } from './actionType'

export const addUser = (data) => {
  console.log(new Date())
  return function (dispatch) {
    dispatch(add(data))
    return Promise.resolve({status: true, msg: 'Added successfuly'})
  }
}

export const updateUser = (data) => {
  console.log(new Date())
  return function (dispatch) {
    dispatch(update(data))
    return Promise.resolve({status: true, msg: 'Added successfuly'})
  }
}

export const getUsers = () => {
  console.log(new Date())
  return function (dispatch) {
    let usersArray = [];
    let usersData = localStorage.getItem('users')
    if(usersData!=null) {
      usersArray = JSON.parse(usersData);
    }
    dispatch(listUsers(usersArray))
    return Promise.resolve({status: true, data: usersArray, msg: 'Listed successfuly'})
  }
}

export const add = payload => ({type: ADD, payload})
export const update = payload => ({type: UPDATE, payload})
export const listUsers = payload => ({type: LIST_USERS, payload})
export const deleteUser = payload => ({type: DELETE, payload})