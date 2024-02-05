export default function Tasks({tasks}){
    return(
        <div>
            <ol>
                {tasks.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ol>
        </div>
    )
}