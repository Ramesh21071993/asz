import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { Table, Divider } from 'antd';
import { Button } from 'antd';
import FormModal from '../components/modal'

import {addTodo, updateTodo, getTodos, deleteTodo} from '../store/todos/actionCreator'

const Todos = props => {
  const {todosArray, addTodo, updateTodo, getTodos, deleteTodo} = props
  const [data, setData] = useState([])
  const [modal, showModal] = useState(false)
  const [type, setType] = useState('A')
  const [todos, setTodos] = useState({
    action: '',
  })
  const columns = [
    {
      title: 'Todo Name',
      dataIndex: 'action',
    },
    {
      title: 'Action',
      render: (text, record) => (
          <>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record)}>Delete</a>
          </>
      ),
    },
  ]

  useEffect(() => {
    getTodos().then(() => {
      setData(todosArray)
    })
  }, [])

  useEffect(() => {
    setData(todosArray)
  }, [todosArray])

  const handleShowTodoModal = () => {
    setType('A');
    showModal(true)
  }

  const handleCancel = () => {
    showModal(false)
    setTodos({
      action: '',
    })
  };

  const handleEdit = (record) => {
    setTodos(record)
    setType('E');
    showModal(true);
  }

  const handleDelete = (record) => {
    deleteTodo(record)
  }

  const createTodo = () => {
    if(type == 'E') {
      updateTodo(todos).then(() => {
        showModal(false)
        setTodos({
          action: '',
        })
      });
    } else {
      addTodo(todos).then(() => {
        showModal(false)
        setTodos({
          action: '',
        })
      });
    }
  }

  const handleChange = (e) => {
    setTodos({
      ...todos,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    <Button onClick={() => handleShowTodoModal()} style={{marginBottom: 10}}>Create Todo</Button>
    <Table rowKey={record => record.id} columns={columns} dataSource={data} />
    <FormModal todosModal={true} type={type} modal={modal} todos={todos} title={'Enter Todo'} handleOk={createTodo} handleChange={handleChange} handleCancel={handleCancel} />
    </>
  );
}


const mapStateToProps = state => ({
  todosArray: state.todos.todosArray,
})

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  getTodos,
  deleteTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);