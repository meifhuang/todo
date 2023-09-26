import { useState, useRef, useEffect } from 'react'
import { Todo } from "../model"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '2px',
    display: 'flex',
    alignItems:'center'
  }, 
  textfield: {
    backgroundColor: 'white',
    padding: '8px',
    margin: '6px'
  }
}

interface Props {
  todo: Todo,
  toggleTodo: (id: number) => void,
  onInputChange: (id: number,  value:string) => void
}

const ToDoItem: React.FC<Props> = ({todo, toggleTodo, onInputChange}) => {

    const [inputValue, setInputValue] = useState<string>(todo.todo);
    const [editMode, setEditMode] = useState<boolean>(false);

    const toggleEditMode = () => {
      setEditMode(!editMode)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
      const {value} = e.target
      setInputValue(value)
      onInputChange(todo.id,value)
    }

    return (
      <Box 
        sx={todoItemStyles.box} 
        m={2} 
        p={1} >
        <Checkbox checked={todo.isDone} onClick={()=> toggleTodo(todo.id)} /> 
           <TextField
              variant='standard'
              type="text" 
              id={`${todo.id}`}
              value={inputValue}
              onChange={handleInputChange}
              // onSubmit={toggleEditMode}
              onBlur={toggleEditMode}
              required
              // label="first name"
              fullWidth
              sx={todoItemStyles.textfield}
            />
      </Box>
    )
  }
  
  export default ToDoItem;
  