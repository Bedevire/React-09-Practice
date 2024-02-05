import Tasks from './Tasks'

export default function Project({project}){
    return(
        <div className="w-[35rem] mt-16">

            
            <header className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h2>
                <button className="text-stone-800 hover:text-stone-950">Delete</button>
                <button className="text-stone-800 hover:text-stone-950">Cancel</button>
                <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
            </header>

            <div className="pb-4 mb-4 border-b-2 border-stone-300">
                <label className="text-sm font-bold uppercase text-stone-500">Title</label>
                <input 
                    type="text" 
                    className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                    placeholder={project.title}>
                </input>


                <label className="text-sm font-bold uppercase text-stone-500">Description</label>
                <textarea 
                    type="textArea" 
                    className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                    placeholder={project.description}>
                </textarea>
                
                <label className="text-sm font-bold uppercase text-stone-500">Due date</label>
                <input 
                    type="date" 
                    className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" 
                    placeholder={project.dueDate}>
                </input>
            </div>

            <div>
                <Tasks tasks={project.tasks} />
            </div>

        </div>
    )
}