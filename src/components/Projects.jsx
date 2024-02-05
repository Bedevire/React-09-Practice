export default function Projects({projects, onSelected}){
    
    function buttonClicked(projectId){
        console.log('Project selected: ' + projectId);
        let project = getSelectedProject(projectId);
        if(project)
            onSelected(project);
        else
            alert('Could not find the selected project');
    }

    function getSelectedProject(projectId){
        let filteredProjects = projects.filter(item => item.id === projectId);
        if(filteredProjects.length > 0)
            return filteredProjects[0];
        else
            return null;
    }   

    return(
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="text-white text-3xl font-bold uppercase">Your projects</h2>
            <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">+ Add Project</button>
            <ol className="mt-8">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button 
                            onClick={() => buttonClicked(project.id)}
                            className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400">
                            {project.title}
                        </button>
                    </li>
                ))}
            </ol>
        </aside>
    )
}