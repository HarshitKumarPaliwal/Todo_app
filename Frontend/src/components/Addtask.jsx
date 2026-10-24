import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Addtask.css";
export default function Addtask() {
  const [taskdata, settaskdata] = useState({});
  const navigate = useNavigate();
  //step-2
  const handleAddTask = async () => {
    console.log(taskdata);

    let result = await fetch("https://todo-app-x7iw.onrender.com/add-task", {
      method: "POST",
      body: JSON.stringify(taskdata),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.success) {
      navigate("/");
      console.log("new task added");
    } else {
      alert("try after some time");
    }
  };

  return (
    <div className="container">
      <h1>Add new task</h1>

      <label htmlFor="">Title</label>
      <input
        onChange={(event) =>
          settaskdata({ ...taskdata, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="enter task title"
      />
      <label htmlFor="">Description</label>
      <textarea
        onChange={(event) =>
          settaskdata({ ...taskdata, description: event.target.value })
        }
        name="description"
        placeholder="enter task"
        rows={4}
        id=""
      ></textarea>
      <button onClick={handleAddTask} className="submit">
        Add data
      </button>
    </div>
  );
}
