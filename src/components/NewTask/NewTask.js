import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from '../../hooks/http-hook';


const NewTask = (props) => {

  const addTask = (data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text:data.text };
    props.onAddTask(createdTask);
  }

  const [sendRequest, isLoading, error] = useHttp(addTask)

  const enterTaskHandler = async (taskText) => {

     const reqObj = {
      url : 'https://react-http-hook-fc541-default-rtdb.firebaseio.com/tasks.json',
      method : "POST",
      body : { text : taskText},
      headers : {'content-type' : 'application/json'}
    }
     sendRequest(reqObj)
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
