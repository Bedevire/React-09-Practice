import { useState } from 'react'
import Projects from './components/Projects'
import Project from './components/Project'

function App() {
  let projects = [
    {
      id: 1,
      title: "React",
      tasks: []
    },
    {
      id: 2,
      title: "Azure",
      tasks: [
        {title: 'AZ-900'},
        {title: 'AZ-104'}
      ]
    }
  ]

  const [selectedProject, setSelectedProject] = useState(null);


  function projectSelected(project){
    console.log('Project ' + project.title + ' selected');
    setSelectedProject(project);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Projects projects={projects} onSelected={projectSelected} />
      {selectedProject && <Project project={selectedProject} />}
    </main> 
  );
}

export default App;
