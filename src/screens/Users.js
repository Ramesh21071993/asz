import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { Table, Divider } from 'antd';
import { Button } from 'antd';
import FormModal from '../components/modal'

import {addUser, updateUser, getUsers, deleteUser} from '../store/users/actionCreator'

const Users = props => {
  const {usersArray, addUser, updateUser, getUsers, deleteUser} = props
  const [data, setData] = useState([])
  const [modal, showModal] = useState(false)
  const [type, setType] = useState('A')
  const [users, setUsers] = useState({
    name: '',
    email: '',
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
    getUsers().then(() => {
      setData(usersArray)
    })
  }, [])

  useEffect(() => {
    setData(usersArray)
  }, [usersArray])

  const handleShowUserModal = () => {
    setType('A');
    showModal(true)
  }

  const handleCancel = () => {
    showModal(false)
    setUsers({
      name: '',
      email: '',
    })
  };

  const handleEdit = (record) => {
    setUsers(record)
    setType('E');
    showModal(true);
  }

  const handleDelete = (record) => {
    deleteUser(record)
  }

  const createUser = () => {
    if(type == 'E') {
      updateUser(users).then(() => {
        showModal(false)
        setUsers({
          name: '',
          email: '',
        })
      });
    } else {
      addUser(users).then(() => {
        showModal(false)
        setUsers({
          name: '',
          email: '',
        })
      });
    }
  }

  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    <Button onClick={() => handleShowUserModal()} style={{marginBottom: 10}}>Create User</Button>
    <Table rowKey={record => record.id} columns={columns} dataSource={data} />
    <FormModal usersModal={true} type={type} modal={modal} users={users} title={'Enter Username'} handleOk={createUser} handleChange={handleChange} handleCancel={handleCancel} />
    </>
  );
}


const mapStateToProps = state => ({
  usersArray: state.users.usersArray,
})

const mapDispatchToProps = {
  addUser,
  updateUser,
  getUsers,
  deleteUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);