import { useState } from 'react'
import ToDoItem from "./ToDoItem"
import {Todo} from "../model"
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 



const todolistStyles = {
  todo_list: {
    display: 'flex', 
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    height: '35em', 
    width: '36em',
    boxShadow: '0px 0px 40px 8px rgb(156, 168, 178)'
  },
  add_task: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    border: '1px solid black',
    borderRadius: '5px',
    width: '100%',
  },
  button: {
      '&:hover': {
       backgroundColor: '#6db3a4'
      },
       backgroundColor: '#84bfb2',
  },
  todos_box: {
    width: '100%'
  }
}

const fakeTodos: Todo[] = [
  { id: 1, todo: 'Complete the project', isDone: false},
  { id: 2, todo: 'Send email to client', isDone: true},
  { id: 3, todo: 'Prepare for the meeting', isDone: false},
];
const ToDoList: React.FC = () => {


  const [todos, setTodos] = useState<Todo[]>(fakeTodos); 
  
//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault()
//     setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
// }

  const handleToggle = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo ))
  }

  // const handleSubmit = (e: React.FormEvent, id: number) => {
  //   // setTodos(todos.map((todo) => todo.id == id ? {...todo, todo: data.}))
  //   e.preventDefault()
  // }

  return (
    <Box sx={todolistStyles.todo_list} p={5} m={2}>
        <Typography variant='h3' m={1} align='center'> Today's Priority Task </Typography>
        <Typography m={2} align='center'> What's the 3 most important tasks of the day? </Typography>
        {/* <Box sx={todolistStyles.add_task} p={1} >
          <AddIcon className="add_icon"/> Add Task
        </Box> */}
       <Box sx={todolistStyles.todos_box}>
        {todos.map((todo) => (
            <ToDoItem todo={todo} toggleTodo={handleToggle} />
        ))}  
      </Box>
        <Button variant="contained" type="submit" sx={todolistStyles.button}> Save </Button> 
        {/* {todos.length === 3 ? <> </> :
        <TextField
            variant="outlined"
            type="text" 
            name="todo"
            id="todo" 
            // value={todo}
            // onChange={handleInputChange}
            required
            label="enter todo"
            fullWidth
            sx={{py:1}}
          />
        } */}
    </Box>
  )
}

export default ToDoList;
