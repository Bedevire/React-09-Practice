export default function Projects({projects, onSelected, onAddProject}){
    
    function btnProjectClicked(projectId){
        console.log('Project selected: ' + projectId);
        //let project = getSelectedProject(projectId);
        onSelected(projectId);
    }

    function btnAddProjetClicked(){
        onAddProject();
    }

     

    return(
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="text-white text-3xl font-bold uppercase">Your projects</h2>
            <button 
                className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
                onClick={btnAddProjetClicked}>
                + Add Project
            </button>
            <ol className="mt-8">
                {projects.map((project) => (
                    <li key={project.id}>
                        <button 
                            onClick={() => btnProjectClicked(project.id)}
                            className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 text-stone-400">
                            {project.title}
                        </button>
                    </li>
                ))}
            </ol>
        </aside>
    )
}