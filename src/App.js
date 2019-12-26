import React from 'react';
import { Tabs } from 'antd';
import Todos from './screens/Todos'
import Users from './screens/Users'
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const App = () => {
  return (
    <div className="App">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Todos" key="1">
      <Todos/>
      </TabPane>
      <TabPane tab="Users" key="2">
        <Users />
      </TabPane>
    </Tabs>
    </div>
  );
}

export default App;
