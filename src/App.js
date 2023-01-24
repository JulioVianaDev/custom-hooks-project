import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
function App() {
  const [tasks, setTasks] = useState([]);
  const TransformedTasks=tasksObj=>{
    const loadedTasks = []

    for(const taskKey in tasksObj){
      loadedTasks.push({id: taskKey,text: tasksObj[taskKey].text})
    }

    setTasks(loadedTasks)
  }
  
  const httpData = useHttp(
    {url:  'https://react-hooks-project-b7b11-default-rtdb.firebaseio.com/tasks.json'}
    ,TransformedTasks
  )

  const {isLoading,error,sendRequest: fetchTasks} =httpData
  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
