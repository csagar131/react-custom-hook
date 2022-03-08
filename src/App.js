import React, { useEffect, useState, useCallback } from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/http-hook";


const App = () => {
  const [tasks, setTasks] = useState([]);

  const transformData = (data) => {
    const loadedTasks = [];
    console.log(data)

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const [sendRequest, isLoading, error] = useHttp({
    url: "https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json",
  }, transformData);

  const fetchTasks = useCallback( async  () => {
   await sendRequest();
  },[])

  useEffect(() => {
    fetchTasks();
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
};

export default App;
