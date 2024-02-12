import { useState } from 'react'
import Projects from './components/Projects'
import Project from './components/Project'
import NoProject from './components/NoProject'

function App() {
  let startingProjects = [
    {
      id: 1,
      title: "React",
      description: 'Learn React from the ground up', 
      dueDate: '2024-04-15',
      tasks: []
    },
    {
      id: 2,
      title: "Azure",
      description: 'Learn Azure. Enough to pass both the Basics test - AZ-900, and the more advanced test, AZ-104', 
      dueDate: '2024-10-23',
      tasks: [
        {id:1, title: 'AZ-900'},
        {id:2, title: 'AZ-104'}
      ]
    }
  ]

  const [projects, setProjects] = useState(startingProjects);
  const [selectedProject, setSelectedProject] = useState(null)
  const [editing, setEditing] = useState(false);
  
  function projectSelected(projectId){
    const project = getSelectedProject(projectId);
    console.log('Project ' + project.title + ' selected');
    setEditing(false);
    setSelectedProject(project)
  }

  function onEditClick(){
    setEditing(prevEditing => !prevEditing);
  }

  function getSelectedProject(projectId){
    let filteredProjects = projects.filter(item => item.id === projectId);
    if(filteredProjects.length > 0)
        return filteredProjects[0];
    else
        return null;
  }

  function onAddProject(){
    console.log('App - onProjectAdd');
    const newId = Math.floor(Math.random() * 10000)
    const newProject = {
      id:newId, 
      title:'New Project', 
      description: '', 
      dueDate: '',
      tasks:[]
    }
    setProjects(initialProjects => [
      ...initialProjects, 
      newProject
    ])
    setSelectedProject(newProject);
    setEditing(prevEditing => true); 
  }

  function onProjectSave(project){
    console.log('App - saving project ' + project.title);
    setEditing(false);
  }

  function onProjectDelete(projectId){
    console.log('App - onProjectDelete');
    setProjects(originalProjects => {
      return originalProjects.filter( item => item.id != projectId);
    });
    setSelectedProject(null);
  }

  function onTaskAdd(taskName){
    console.log('App - onTaskAdd - ' + taskName);
    const taskId = Math.floor(Math.random() * 10000);
    const newTask = {id:taskId, title: taskName}

    setSelectedProject({
      id: selectedProject.id, 
      title: selectedProject.title, 
      description: selectedProject.description, 
      dueDate: selectedProject.dueDate,
      tasks: [...selectedProject.tasks, newTask]
    });
  }

  function onTaskDelete(taskId){
    console.log('App - onTaskDelete - ' + taskId);

    setSelectedProject({
      id: selectedProject.id, 
      title: selectedProject.title, 
      description: selectedProject.description, 
      dueDate: selectedProject.dueDate,
      tasks: selectedProject.tasks.filter(item => item.id != taskId)
    });
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projects projects={projects} onSelected={projectSelected} onAddProject={onAddProject} />
      {selectedProject && <Project project={selectedProject} editing={editing} onEditing={onEditClick} onTaskAdd={onTaskAdd} onTaskDelete={onTaskDelete} onProjectSave={onProjectSave} />}
      {!selectedProject && <NoProject onCreateProject={onAddProject} />}
    </main> 
  );
}

export default App;
