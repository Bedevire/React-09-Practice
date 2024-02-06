import { useState } from 'react'
import Projects from './components/Projects'
import Project from './components/Project'
import NoProject from './components/NoProject'

function App() {
  let startingProjects = [
    {
      id: 1,
      title: "React",
      description: '', 
      dueDate: '',
      tasks: []
    },
    {
      id: 2,
      title: "Azure",
      description: '', 
      dueDate: '',
      tasks: [
        {id:1, title: 'AZ-900'},
        {id:2, title: 'AZ-104'}
      ]
    }
  ]

  const [projects, setProjects] = useState(startingProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(-1);
  
  function projectSelected(projectId){
    const project = getSelectedProject(projectId);
    console.log('Project ' + project.title + ' selected');
    setSelectedProjectId(projectId);
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
    setProjects(initialProjects => [
      ...initialProjects, 
      {
        id:newId, 
        title:'New Project', 
        description: '', 
        dueDate: '',
        tasks:[]
      }])
  }

  function onProjectDelete(){
    console.log('App - onProjectDelete');
  }

  function onTaskAdd(taskName){
    console.log('App - onTaskAdd - ' + taskName);
    const taskId = Math.floor(Math.random() * 10000);
    const newTask = {id:taskId, title: taskName}
    let project = getSelectedProject(selectedProjectId)
    project.tasks = [...project.tasks, newTask]

    setProjects([...projects]);
  }

  function onTaskDelete(taskId){
    console.log('App - onTaskDelete - ' + taskId);

    let project = getSelectedProject(selectedProjectId);
    project.tasks = project.tasks.filter(item => item.id != taskId);

    setProjects([...projects])
  }

  const selectedProject = getSelectedProject(selectedProjectId);

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projects projects={projects} onSelected={projectSelected} onAddProject={onAddProject} />
      {selectedProject && <Project project={selectedProject} onTaskAdd={onTaskAdd} onTaskDelete={onTaskDelete} />}
      {!selectedProject && <NoProject onCreateProject={onAddProject} />}
    </main> 
  );
}

export default App;
