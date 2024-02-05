import { useState } from 'react'
import Projects from './components/Projects'
import Project from './components/Project'

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
  const [selectedProject, setSelectedProject] = useState(null);


  function projectSelected(project){
    console.log('Project ' + project.title + ' selected');
    setSelectedProject(project);
  }

  function onAddProject(){
    console.log('project added');
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

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projects projects={projects} onSelected={projectSelected} onAddProject={onAddProject} />
      {selectedProject && <Project project={selectedProject} />}
    </main> 
  );
}

export default App;
