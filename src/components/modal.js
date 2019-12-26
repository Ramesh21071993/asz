import React, {useState} from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';

const FormModal = props => {

  const [loading, setLoading] = useState(false)
  async function wait(duration = 1000) {
    await new Promise(resolve => setTimeout(resolve, duration));
  }
  
  const handleSubmit = async () => {
    setLoading(true);
    await wait(2000);
    setLoading(false)
    props.handleOk();
  }

  return (
    <>
    <Modal
          visible={props.modal}
          title={props.title}
          onOk={props.handleOk}
          onCancel={props.handleCancel}
          footer={[
            <Button key="back" onClick={props.handleCancel}>
              Cancel
            </Button>,
            <Button disabled={(props.usersModal && props.users.name!='' && props.users.email!='') || (props.todosModal && props.todos.action!='' && props.todos.action!='')?false:true} key="submit" type="primary" loading={loading} onClick={() => handleSubmit()}>
              {props.type != 'E'?'Add':'Update'}
            </Button>,
          ]}
        >
            {
                props.usersModal?(
                    <>
                    <p>Name</p>
                    <Input name="name" value={props.users.name} onChange={(e) => props.handleChange(e)}/>
                    <p>Email</p>
                    <Input name="email" value={props.users.email} onChange={(e) => props.handleChange(e)}/>
                    </>
                ): (
                    <>
                    <p>Name</p>
                    <Input name="action" value={props.todos.action} onChange={(e) => props.handleChange(e)}/>
                    </>
                )
            }
        </Modal>
    </>
  );
}

export default FormModal;