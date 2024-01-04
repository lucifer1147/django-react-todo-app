import React from 'react'

function FormWrapper(props) {
    const handleSubmit = (event) => {
        event.preventDefault()

        let url = 'http://localhost:8000/api'
        if (props.EditingTask) {
            url = url + '/task-update/' + props.ActiveItem.id.toString() + '/'
        } else {
            url = url + '/task-create/'
        }

        fetch(url, {
            method: 'POST', headers: {
                'content-type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'X-CSRFToken': props.getCookie('csrftoken')
            },
            // mode: 'same-origin',
            body: JSON.stringify(props.ActiveItem)
        }).then(response => {
            props.setActiveItem({
                id: null, title: '', description: '', completed: false,
            })
            props.changeEditingStatus(false)
            props.changeTitleLength(0)
            props.changeDescriptionLength(0)
        }).catch((error) => {
            console.error(error)
        })

    }

    const handleChange = (event, desg) => {
        let value = event.target.value

        if (desg === 'input') {
            props.setActiveItem({
                id: props.ActiveItem.id,
                title: value.slice(0, 40),
                description: props.ActiveItem.description,
                completed: props.ActiveItem.completed,
            })
            props.changeTitleLength(value.length > 40 ? 40 : value.length)
        } else if (desg === 'text-area') {
            props.setActiveItem({
                id: props.ActiveItem.id,
                title: props.ActiveItem.title,
                description: value.slice(0, 200),
                completed: props.ActiveItem.completed
            })
            props.changeDescriptionLength(value.length > 200 ? 200 : value.length)
        } else if (desg === 'checkbutton') {
            props.setActiveItem({
                id: props.ActiveItem.id,
                title: props.ActiveItem.title,
                description: props.ActiveItem.description,
                completed: event.target.checked,
            })
        }
    }

    return (
        <div id="form-wrapper"
             className="w-1/2 bg-indigo-100 dark:bg-indigo-950 px-16 py-16 shadow-black shadow-2xl rounded-xl overflow-x-auto dark:text-white bg-opacity-80 dark:bg-opacity-70 backdrop-blur-sm">
            <form id="task-form" className="flex flex-col items-start" onSubmit={handleSubmit} method="POST"
                  action="/">

                <div className="font-semibold">Title:</div>
                <input type="text" name="task-title" id="task-title"
                       className="w-full border-2 border-gray-400 font-mono font-bold text-black py-1 px-2 dark:text-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70"
                       placeholder="Your Task Title Here..."
                       value={props.ActiveItem.title}
                       onChange={(event) => {
                           handleChange(event, 'input')
                       }}/>
                <div className="h-0 w-0 self-end mx-14">
                    <div
                        className={"relative bottom-[18px] font-semibold font-mono text-right right-12 w-[100px] text-xs" + (props.TitleLength >= 40 ? " text-red-500" : "")}>{props.TitleLength + "/40"}</div>
                </div>
                <br/>

                <div className="font-semibold">Description:</div>
                <textarea name="text-desc" id="task-desc" style={{resize: "none"}}
                          className="w-full h-28 border-2 border-gray-400 font-mono font-bold text-black py-1 px-2 dark:bg-gray-900 dark:text-white bg-opacity-70 dark:bg-opacity-70"
                          placeholder="Your Task Description Here..." value={props.ActiveItem.description}
                          onChange={(event) => {
                              handleChange(event, 'text-area')
                          }}></textarea>
                <div className="h-0 w-0 self-end mx-14">
                    <div
                        className={"relative bottom-[18px] font-semibold font-mono text-right right-12 w-[100px] text-xs" + (props.DescriptionLength >= 200 ? " text-red-500" : "")}>{props.DescriptionLength + "/200"}</div>
                </div>
                <br/>

                <label htmlFor="completed" className="font-semibold">Completed: <input type="checkbox"
                                                                                       name="completed"
                                                                                       id="completed-box"
                                                                                       checked={props.ActiveItem.completed}
                                                                                       onChange={(event) => {
                                                                                           handleChange(event, 'checkbutton')
                                                                                       }}/>
                </label>
                <br/>

                <input type="submit" value={props.EditingTask ? "Save Task" : "Create Task"}
                       disabled={props.ActiveItem.title === ''}
                       className="bg-orange-500 dark:bg-pink-600 dark:disabled:bg-pink-500 dark:hover:bg-pink-700 px-5 py-2 text-white font-bold rounded-md w-full hover:bg-orange-600 disabled:bg-orange-400"/>
            </form>
        </div>
    )
}

export default FormWrapper;
