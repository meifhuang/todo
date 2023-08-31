import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ToDoList from "./ToDoList"
import {Todo} from "../model"; 
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import "../styles/VirtualAssistant.css"



const VirtualAssistant: React.FC= () => {

  const commands = [
    {
      command: 'reset',
      callback: () => {
        resetTranscript()
        setMessage('you may restate your command')
      } 
    },
    {
      command: ['hello', 'hi', 'hey'],
      callback: () => setMessage('hello there')
    },
    {
      command: 'stop listening',
      callback: () => handleStopListening()
    },
    {
      command: '*weather*',
      callback: () => {
           setMessage('the weather outside is frightful')
        }, 
    },
    {
      command: ['add * to my list', 'add * to the list'], 
      callback: (command:string) => {
        console.log(command)
        setTodo(command)
        setTodos((prev) => [...prev, {id: Date.now(), todo: command, isDone: false}])
        setTodo("")
        resetTranscript()
        setTimeout(()=>setMessage('added'),1000)
      }
    },
    { 
      command: ['completed *', '* done', 'Mark * as done', 'mark * as done'],
      callback: (item:string) => {
        
        setTodos(todos.map((todo) => 
        todo.todo.includes(item) ? {...todo, isDone: !todo.isDone} : todo))
      } 
    },
    {
      command: ['edit * to *'],
      callback: (item1:string, item2:string) => {
      setTodos(todos.map((todo) =>  
      todo.todo.includes(item1) ? {...todo, todo: item2} : todo))
    }},

    {
      command: ['delete * from my list', 'remove * from my list', 'remove *'],
      callback: (item:string) => {
        setTodos(todos.filter((todo) =>
        !todo.todo.includes(item)))
        setMessage('removed')
    }
  },
  ]

  const [message, setMessage] = useState<string>(""); 
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMic = () => {
    if (listening) {
      handleStopListening()
     } 
    else { handleStartListening() } 
  }

  const handleStartListening = () => {
    console.log('listening')
    SpeechRecognition.startListening({continuous:true});
  };

  const handleStopListening = () => {
    console.log('stop mic')
    SpeechRecognition.stopListening();
    resetTranscript()
  }

  return (
    <div> 
      <ToDoList todos={todos} setTodos={setTodos}/>
      <button className="microphone_button" type="button" onClick={handleMic}> {listening ? <MicIcon className='microphone'/> : <MicOffIcon className='microphone'/> } </button>
      {/* <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p> {transcript} </p> */}
      <p>{message}</p>
    </div>
  )
  }
    // return <form className='input'>
    //     <input type='input' 
    //     placeholder='Enter instructions' 
    //     className='input_box'
    //     value={message} 
    //     onChange={(e)=> setMessage(e.target.value)}/>  
    //     <button className='input_submit' type='submit' > Enter instructions </button>
    // </form> 
    
export default VirtualAssistant;

