import { useState, useRef} from 'react'
import Tasks from './Tasks'

export default function Project({project, editing, onEditing, onTaskAdd, onTaskDelete, onProjectSave}){

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [dueDate, setDueDate] = useState(project.dueDate);

    function onEditClick(){
        if(!editing){
            setTitle(project.title);
            setDescription(project.description);
            setDueDate(project.dueDate);
        }
        else{
            setTitle('');
            setDescription('');
            setDueDate('');
        }
        onEditing();
    }

    function onTitleChange(event){
        setTitle(event.target.value);
        console.log('Title changed')
    }

    function onDescriptionChange(event){
        setDescription(event.target.value);
        console.log('Description changed')
    }

    function onDuaDateChange(event){
        setDueDate(event.target.value);
        console.log('Due date changed')
    }

    function onSaveClicked(){
        project.title = title;
        project.description = description;
        project.dueDate = dueDate.current;
        onProjectSave(project);
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    return(
        <div className="w-[35rem] mt-16">
            
            <header className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h2>
                {editing && 
                    <>
                        <button onClick={onEditClick} className="text-stone-500 hover:text-stone-950">Cancel</button>
                        <button onClick={onSaveClicked} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
                    </>
                }
                {!editing && <button onClick={onEditClick} className="text-stone-500 hover:text-stone-950">Edit</button>}
                <button className="text-stone-800 hover:text-red-500">Delete</button>
            </header>

            { editing && 
                <div className="pb-4 mb-4 border-b-2 border-stone-300">
                    <label className="text-sm font-bold uppercase text-stone-500">Title</label>                
                        <input 
                            type="text" 
                            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                            
                            onChange={onTitleChange}
                            value={title}
                        >
                        </input>

                    <label className="text-sm font-bold uppercase text-stone-500">Description</label>
                    <textarea 
                        type="textArea" 
                        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                        onChange={onDescriptionChange}
                        value={description}
                    >
                    </textarea>
                    
                    <label className="text-sm font-bold uppercase text-stone-500">Due date</label>
                    <input 
                        type="date" 
                        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                        onChange={onDuaDateChange}
                        value={dueDate}
                    >
                    </input>
                </div>
            }
            { !editing &&
                <div className="pb-4 mb-40 border-b-2 border-stone-300">
                    <p className="text-stone-400 mb-4">{project.dueDate}</p>
                    <p className="text-stone-600">{project.description}</p>
                </div>
            }


            <div>
                <Tasks tasks={project.tasks} onTaskAdd={onTaskAdd} onTaskDelete={(taskId) => onTaskDelete(taskId, project.id)} />
            </div>

        </div>
    )
}