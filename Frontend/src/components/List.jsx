
import { Fragment, useEffect, useState } from "react";
import "../Style/List.css";
import{Link} from 'react-router-dom'

export default function List() {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks",{
      credentials:'include'
    });
    list = await list.json();

    if (list.success) {
      setTaskData(list.result);
    }else{
      alert("try after some time")
    }
  };
const deleteTask=async(id)=>{
  let item = await fetch(`http://localhost:3200/delete/${id}`, {
  method: "DELETE",
        credentials:'include',
});  
  //let item= await fetch('http://localhost:3200/delete'+id,{method:'delete'}      credentials:'include',);
    item = await item.json();
    if (item.success) {
      console.log("item deleted");
       getListData();
      //setTaskData(list.result);
    }else{
      alert("try after some time")
    }
  };
  return (
    <div>
      <h1>To Do List</h1>

      <ul className="task-list">
        <li className="List-header">S.No</li>
        <li className="List-header">Title</li>
        <li className="List-header">Description</li>
        <li className="List-header">Delete</li>
        {
        taskData && taskData.map((item, index) => (
      <Fragment key={item._id}>
      
            <li className="List-item">{index + 1}</li>
            <li className="List-item">{item.title}</li>
            <li className="List-item">{item.description}</li>
           <li className="List-item">
  <button onClick={()=>deleteTask(item._id)} className="delete-item">Delete</button>
  
  <Link to={`/update/${item._id}`} className="update-item">update</Link>
</li>  
</Fragment>   
        ))
        }
      </ul>
    </div>
  );
}