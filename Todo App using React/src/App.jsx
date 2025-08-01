import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) =>{
      
    setshowFinished(!showFinished)
  }

  
  const handleEdit = (e, id)=>{
      let t = todos.filter(i=>i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e)=>{
    
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
  
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  


  return (
    <>
    
     <div className="h-screen w-full bg-gradient-to-tr from-purple-400 via-sky-300  to-indigo-500 
     bg-200 animate-gradient-move">
    <Navbar/>
   

      <div className="container bg-white/10 mx-auto backdrop-blur-xl border border-white/20 shadow-xl
              rounded-[2rem] text-white my-3.5 p-5 min-h-[85vh] md:w-1/2 sm:w-1/2 xs:w-1/2 xl:w-1/2 ">

                <div className="flex items-center justify-center font-bold text-2xl">iTask - Your Task Planner</div>

        <div className="addTodo">
          <h1 className='text-lg font-bold'>Add a Todo</h1>

         <div className="flex">

          <input onChange={handleChange} value={todo} className='backdrop-blur-md bg-white/10 border border-white/20 
               text-white font-semibold w-full px-5 py-2 rounded-full 
               shadow-sm hover:bg-white/20 hover:shadow-lg 
               transition-all duration-300 items-center gap-2 mx-2 outline-none' type="text" />

          <button onClick={handleAdd} disabled = {todo.length<=1} className=' backdrop-blur-md bg-white/10 border border-white/20 
               text-white font-semibold px-6 py-2 rounded-full 
               shadow-sm hover:bg-white/20 hover:shadow-lg 
               transition-all duration-300 items-center gap-2 outline-none'>Save</button>
        </div>
      </div>

          <input onChange={toggleFinished} type= "checkbox" checked={showFinished} /> Show Finished

          <hr className='my-1 opacity-40'/>

          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item=>{

           
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-5">

              <div className='flex gap-5 flex-1 min-w-0 '>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />

                <div className={item.isCompleted ? "line-through break-words whitespace-pre-wrap" : "break-words whitespace-pre-wrap"} style={{wordBreak: "break-word", maxWidth: "100%"}}>
                  {item.todo}
                </div>
              </div>

               <div className="buttons flex h-full flex-shrink-0">
                <button onClick={(e)=>handleEdit(e, item.id)} className='backdrop-blur-md bg-white/10 border border-white/20 
               text-white font-semibold px-6 py-2 rounded-full 
               shadow-sm hover:bg-white/20 hover:shadow-lg 
               transition-all duration-300 items-center gap-2 mx-1'><FaEdit /></button>

                <button onClick={(e)=>{handleDelete(e, item.id)}} className='backdrop-blur-md bg-white/10 border border-white/20 
               text-white font-semibold px-6 py-2 rounded-full 
               shadow-sm hover:bg-white/20 hover:shadow-lg 
               transition-all duration-300 items-center gap-2 mx-1 '><MdDelete /></button>
               </div>
            </div>
            })}
          </div>
           
        </div>
      
      </div>
    </>
  )
}

export default App
