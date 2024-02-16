import { useRef } from 'react'

export default function Tasks({tasks, onTaskAdd, onTaskDelete}){
    
    const taskName = useRef();

    function btnAddClicked(){
        onTaskAdd(taskName.current.value)
        taskName.current.value = '';
    }

    function btnDeleteClick(taskId){
        onTaskDelete(taskId);
    }

    return(
        <div>
            <h1 className="text-3xl font-bold text-stone-600 mb-2">Tasks</h1>
            <div>
                <input type="text" ref={taskName} className="w-64 px-2 py-1 mx-4 rounded-md bg-stone-100"></input>
                <button onClick={btnAddClicked} className="px-6 py-2 rounded-md bg-stone-800 text-stone-100 hover:bg-stone-950">Add Task</button>
            </div>
            <ol>
                {tasks.map((item) => (
                    <li key={item.id} className="p-4 mt-8 rounded-md bg-stone-100 flex justify-between my-4" >
                        <label>{item.title}</label>
                        <button onClick={() => btnDeleteClick(item.id)} className="text-stone-700 hover:text-red-500">Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    )
}