import React, { useEffect, useState,useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
function App() {
  const [tasks, setTasks] = useState([]);
  
  
  const httpData = useHttp()

  const {isLoading,error,sendRequest: fetchTasks} =httpData
  useEffect(() => {
    const TransformedTasks=tasksObj=>{
      const loadedTasks = []
  
      for(const taskKey in tasksObj){
        loadedTasks.push({id: taskKey,text: tasksObj[taskKey].text})
      }
  
      setTasks(loadedTasks)
    }
    fetchTasks({url:  'https://react-hooks-project-b7b11-default-rtdb.firebaseio.com/tasks.json'},TransformedTasks);
  }, [fetchTasks]);

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
