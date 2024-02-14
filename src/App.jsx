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

  const [appState, setAppState] = useState({
    projects: startingProjects,
    selectedProject: null,
    editing: false
  });
  
  function projectSelected(projectId){
    const project = getSelectedProject(projectId);
    
    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        selectedProject: project,
        editing: false
      } 
    });
  }

  function onEditClick(){
    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        editing: !originalAppState.editing
      } 
    });
  }

  function getSelectedProject(projectId){
    let filteredProjects = appState.projects.filter(item => item.id === projectId); 
    if(filteredProjects.length > 0)
        return filteredProjects[0];
    else
        return null;
  }

  function onAddProject(){
    const newId = Math.floor(Math.random() * 10000)
    
    const newProject = {
      id:newId, 
      title:'New Project', 
      description: '', 
      dueDate: '',
      tasks:[]
    }
    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        projects: [...originalAppState.projects, newProject],
        selectedProject: newProject
      }
    });
    
    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        editing: true
      } 
    });
    
  }

  function onProjectSave(project){

    const projectIndex = appState.projects.findIndex(item => item.id === project.id);

    appState.projects[projectIndex].title = project.title;
    appState.projects[projectIndex].description = project.description;
    appState.projects[projectIndex].dueDate = project.dueDate;
    appState.projects[projectIndex].tasks = [...project.tasks];

    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        projects: originalAppState.projects,
        editing: false
      } 
    });
  }

  function onProjectDelete(projectId){
    console.log('App - onProjectDelete');
    setAppState((originalAppState) => {
      return {
        ...originalAppState,
        projects: originalAppState.projects.filter(item => item.id !== projectId),
        selectedProject: null
      }
    });
  }

  function onTaskAdd(taskName){
    const taskId = Math.floor(Math.random() * 10000);
    const newTask = {id:taskId, title: taskName}

    const updatedProject = {
      id: appState.selectedProject.id, 
      title: appState.selectedProject.title, 
      description: appState.selectedProject.description, 
      dueDate: appState.selectedProject.dueDate,
      tasks: [...appState.selectedProject.tasks, newTask]
    };

    setAppState((originalAppState) => {
      return{
        ...originalAppState,
        selectedProject: updatedProject,
        editing: true
      }
    });
  }

  function onTaskDelete(taskId){

    const updatedProject = {
      id: appState.selectedProject.id, 
      title: appState.selectedProject.title, 
      description: appState.selectedProject.description, 
      dueDate: appState.selectedProject.dueDate,
      tasks: appState.selectedProject.tasks.filter(item => item.id != taskId)
    };

    setAppState((originalAppState) => {
      return{
        ...originalAppState,
        selectedProject: updatedProject,
        editing: true
      }
    });
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projects projects={appState.projects} onSelected={projectSelected} onAddProject={onAddProject} />
      
      {appState.selectedProject && 
        <Project 
            project={appState.selectedProject} 
            editing={appState.editing} 
            onEditing={onEditClick} 
            onTaskAdd={onTaskAdd} 
            onTaskDelete={onTaskDelete} 
            onProjectSave={onProjectSave} 
        />}
        
      {!appState.selectedProject && 
        <NoProject onCreateProject={onAddProject} 
        />}

    </main> 
  );
}

export default App;
