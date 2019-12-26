import users from './users/reducer'
import todos from './todos/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    users,
    todos
})

export default rootReducer