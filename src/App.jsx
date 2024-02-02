import { useState } from 'react'
import Projects from './components/Projects'

function App() {
  let projects = [
    {
      title: "React",
      tasks: []
    },
    {
      title: "Azure",
      tasks: [
        {title: 'AZ-900'},
        {title: 'AZ-104'}
      ]
    }
  ]
  return (
    <>
      <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
      <Projects projects={projects} />
    </> 
  );
}

export default App;
