import { useState} from 'react'
import Section from "../UI/Section";
import TaskForm from "./TaskForm";


const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async (taskText) => {

    try{
      setIsLoading(true)
      setError(false)

      const response = await fetch('https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json',{
        method : "POST",
        body : JSON.stringify({ text: taskText }),
        headers : {'content-type' : 'application/json'}
      })

      const data = await response.json()
      
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    }
    catch(error){
      setError(error.message)
    }
    setIsLoading(false)
    
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
