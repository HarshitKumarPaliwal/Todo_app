import { useEffect, useState } from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import '../style/Addtask.css'
export default function UpdateTask(){   
    const [taskdata,settaskdata]=useState({});
   const navigate=useNavigate();
   const {id}=useParams()
   console.log(id);
   
    //step-2
    useEffect(()=>{       
getTask(id)
    },[])
    const getTask=async(id)=>{
        let task=await fetch(`https://todo-app-x7iw.onrender.com/tasks/` +id,{
         credentials:"include"     
        })
        task=await task.json()
        if(task.result){
          settaskdata(task.result)  
        }
    }
const UpdateTask=async()=>{
    console.log(taskdata);
let task=await fetch("https://todo-app-x7iw.onrender.com/update-task",{
   method:'put',
       credentials:"include",
   body:JSON.stringify(taskdata),
   headers:{
    'Content-Type':'Application/json'
   } 
});
task=await task.json()
if(task.success){
    navigate('/')
}    
}

    return(
        <div className="container">
            <h1>update task</h1>
            
                <label htmlFor="">Title</label>
                <input value={taskdata.title} onChange={(event)=>settaskdata({...taskdata,title:event.target.value})} type="text" name="title" placeholder="enter task title"/>
                <label htmlFor="">Description</label>
                <textarea value={taskdata.description} onChange={(event)=>settaskdata({...taskdata,description:event.target.value})}  name="description" placeholder="enter task" rows={4} id=""></textarea>
                <button onClick={UpdateTask} className="submit">update data</button>
            
        </div>
    )
}

