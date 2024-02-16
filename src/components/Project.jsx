import { useState, useRef} from 'react'
import Tasks from './Tasks'
import Input from './Input'
import Modal from './Modal'

export default function Project({project, editing, onEditing, onProjectSave, onProjectDelete, onTaskAdd, onTaskDelete}){

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [dueDate, setDueDate] = useState(project.dueDate);
    //const [formInvalid, setFormInvalid] = useState

    //const titleRef = useRef();
    //const descriptionRef = useRef();
    //const dueDateRef = useRef();
    const modal = useRef();

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
        project.title = title.trim();
        project.description = description.trim();
        project.dueDate = dueDate.trim();
        
        //project.title = titleRef.current.value;
        //project.description = descriptionRef.current.value;
        //project.dueDate = dueDateRef.current.value;
 
        if(project.title == '' || project.description == '' || project.dueDate == ''){
            //alert('please fill out all fields.')
            modal.current.open();
        }
        else{
            onProjectSave(project);
            clearState();
        }
    }

    function clearState(){
        setTitle('');
        setDescription('');
        setDueDate('');
        //titleRef.current.value = '';
        //descriptionRef.current.value = '';
        //dueDateRef.current.value = '';
    }

    function setStateByProject(){
        setTitle(project.title);
        setDescription(project.description);
        setDueDate(project.dueDate);
        //pomRef.current.value = 'aaaa';
        //titleRef.current.value = project.title;
        //descriptionRef.current.value = project.description;
        //dueDateRef.current.value = project.dueDate;
    }

    return(
        <>
            <Modal ref={modal} title="Invalid input" buttonLabel="OK" >
                <p className="text-red-500 mb-4 mt-2">Please fill out all fields</p>
            </Modal>
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
                    <button onClick={() => onProjectDelete(project.id)} className="text-stone-800 hover:text-red-500">Delete</button>
                </header>

                { editing && 
                    <div className="pb-4 mb-4 border-b-2 border-stone-300">
                        {/* <Input ref={titleRef} isTextArea={false} label="Title" initialValue={project.title} ></Input>
                        <Input ref={descriptionRef} isTextArea={true} label="Description" initialValue={project.description}  ></Input>
                        <Input ref={dueDateRef} isTextArea={false} label="Due date" initialValue={project.dueDate} type="date"></Input> */}
                        <Input isTextArea={false} label="Title" initialValue={project.title} onValueChange={onTitleChange} ></Input>
                        <Input isTextArea={true} label="Description" initialValue={project.description} onValueChange={onDescriptionChange}  ></Input>
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
        </>
    )
}