import React from 'react';

function ListWrapper(props) {
    return (
        <div id="list-wrapper"
             className="bg-blue-100 w-1/2 px-16 py-16 shadow-black shadow-2xl rounded-xl overflow-x-auto">
            <ul className="flex flex-col justify-center gap-y-3">
                {(props.TodoList.length > 0 ? props.TodoList.toReversed().map((obj) => {
                    return (
                        <li key={obj.id}
                            className={"px-12 py-5 w-full shadow-sm rounded-md flex " + (obj.id === props.ActiveItem.id ? 'bg-gray-300' : (obj.completed ? 'bg-green-300' : 'bg-white'))}
                            onClick={() => {
                                props.currActiveItem(obj.id)
                            }}>
                            <div className="w-5/6 text-wrap">
                                <h3 className={(obj.completed ? "line-through " : "") + "text-lg font-bold text-left"}>{obj.id}. {obj.title}</h3>
                                <p className={(obj.completed ? "line-through " : "") + "text-left"}>{obj.description.slice(0, 30)}{obj.description.length > 30 ? "..." : ""}</p>
                            </div>

                            <div className="w-1/6">
                                <button className="w-full h-full p-2 flex justify-end items-center"
                                        onClick={(event) => {
                                            props.handleDelete(event, obj.id)
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
                }) : (
                    <div className="px-12 py-5 w-full rounded-md bg-white shadow-sm">
                        <h3 className="text-lg font-bold text-center">No Tasks Yet...</h3>
                        <p className="text-center">Add Some to get Started</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ListWrapper;
