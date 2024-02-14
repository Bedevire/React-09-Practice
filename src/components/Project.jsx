import { useState, useRef} from 'react'
import Tasks from './Tasks'
import Input from './Input'

export default function Project({project, editing, onEditing, onTaskAdd, onTaskDelete, onProjectSave}){

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [dueDate, setDueDate] = useState(project.dueDate);

    function onEditClick(){
        if(!editing){
            setStateByProject();
        }
        else{
            clearState();
        }
        onEditing();
    }

    function onTitleChange(event){
        setTitle(event.target.value);
    }

    function onDescriptionChange(event){
        setDescription(event.target.value);
    }

    function onDuaDateChange(event){
        setDueDate(event.target.value);
    }

    function onTaskAddProject(taskName){
        onTaskAdd(taskName);
        setStateByProject();
    }

    function onTaskDeleteProject(taskId, projectId){
        onTaskDelete(taskId);
        setStateByProject();
    }

    function onSaveClicked(){
        project.title = title;
        project.description = description;
        project.dueDate = dueDate;
        onProjectSave(project);
        clearState();
    }

    function clearState(){
        setTitle('');
        setDescription('');
        setDueDate('');
    }

    function setStateByProject(){
        setTitle(project.title);
        setDescription(project.description);
        setDueDate(project.dueDate);
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
                    <Input isTextArea={false} label="Title" initialValue={project.title} onValueChange={onTitleChange}></Input>
                    <Input isTextArea={true} label="Description" initialValue={project.description} onValueChange={onDescriptionChange} ></Input>
                    <Input isTextArea={false} label="Due date" initialValue={project.dueDate} onValueChange={onDuaDateChange} type="date"></Input>
                </div>
            }
            { !editing &&
                <div className="pb-4 mb-40 border-b-2 border-stone-300">
                    <p className="text-stone-400 mb-4">{project.dueDate}</p>
                    <p className="text-stone-600">{project.description}</p>
                </div>
            }

            <div>
                <Tasks tasks={project.tasks} onTaskAdd={onTaskAddProject} onTaskDelete={(taskId) => onTaskDeleteProject(taskId, project.id)} />
            </div>

        </div>
    )
}