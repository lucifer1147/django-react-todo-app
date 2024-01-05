import React from 'react';

function ListItem(props) {

    const handleDelete = (event, id) => {
        let url = 'http://localhost:8000/api/task-delete/' + id + '/'
        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': props.getCookie('csrftoken')
            },
            // mode: 'same-origin'
        })


        setTimeout(() => {
            props.setActiveItem({
                id: null, title: '', description: '', completed: false,
            })
            props.changeEditingStatus(false)
            props.changeDescriptionLength(0)
            props.changeTitleLength(0)
        }, 100)
    }

    return (
        <li key={props.obj.id}
            className={"py-5 shadow-sm rounded-md flex bg-opacity-70 dark:bg-opacity-70 " + (props.obj.id === props.ActiveItem.id ? 'bg-gray-300 dark:bg-gray-700' : (props.obj.completed ? 'bg-green-300 dark:bg-green-700' : 'bg-white dark:bg-gray-900'))}
            onClick={() => {
                props.currActiveItem(props.obj.id)
            }}>
            <div className="w-5/6 break-all pl-12">
                <h3 className={(props.obj.completed && !(props.obj.id === props.ActiveItem.id) ? "line-through " : "") + "text-lg font-bold text-left"}>
                    {props.obj.id+". "+props.obj.title}
                </h3>
                <p className={(props.obj.completed && !(props.obj.id === props.ActiveItem.id) ? "line-through " : "") + "text-left"}>
                    {(props.obj.description.length > 30) && !(props.obj.id === props.ActiveItem.id) ? props.obj.description.slice(0, 30) + "..." : props.obj.description}
                </p>
            </div>

            <div className="w-1/6">
                <button className="w-full h-full p-2 flex justify-center items-center"
                        onClick={(event) => {
                            handleDelete(event, props.obj.id)
                        }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-red-500"
                         viewBox="0 0 448 512">
                        <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                </button>
            </div>
        </li>
    )
}

export default ListItem;
