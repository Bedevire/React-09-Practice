export default function Projects({projects}){
    return(
        <ol>
            {projects.map((project) => (
                <li>{project.title}</li>
            ))}
        </ol>
    )
}