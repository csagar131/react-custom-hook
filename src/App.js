import React, { useEffect, useState, useCallback} from "react";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/http-hook";


const App = () => {
  const [tasks, setTasks] = useState([]);

  const transformData = useCallback((data) => {
    const loadedTasks = [];
    console.log(data)

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  },[])

  const [sendRequest , isLoading, error] = useHttp(transformData);

  useEffect(() => {
    sendRequest({
      url: "https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json",
    })
  }, [sendRequest]);

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
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
};

export default App;
