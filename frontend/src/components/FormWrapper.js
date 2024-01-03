import React from 'react'

function FormWrapper(props) {
    return (
        <div id="form-wrapper"
             className="w-1/2 bg-blue-100 px-16 py-16 shadow-black shadow-2xl rounded-xl overflow-x-auto">
            <form id="task-form" className="flex flex-col items-start" onSubmit={props.handleSubmit} method="POST"
                  action="/">

                <div className="font-semibold">Title:</div>
                <input type="text" name="task-title" id="task-title"
                       className="w-full border-2 border-gray-400 font-mono font-bold text-black py-1 px-2"
                       placeholder="Your Task Title Here..."
                       value={props.ActiveItem.title}
                       onChange={(event) => {
                           props.handleChange(event, 'input')
                       }}/>
                <br/>

                <div className="font-semibold">Description:</div>
                <textarea name="text-desc" id="task-desc"
                          className="w-full h-24 border-2 border-gray-400 font-mono font-bold text-black py-1 px-2"
                          placeholder="Your Task Description Here..." value={props.ActiveItem.description}
                          onChange={(event) => {
                              props.handleChange(event, 'text-area')
                          }}></textarea>
                <br/>

                <label htmlFor="completed" className="font-semibold">Completed: <input type="checkbox"
                                                                                       name="completed"
                                                                                       id="completed-box"
                                                                                       checked={props.ActiveItem.completed}
                                                                                       onChange={(event) => {
                                                                                           props.handleChange(event, 'checkbutton')
                                                                                       }}/>
                </label>
                <br/>

                <input type="submit" value={props.EditingTask ? "Save Task" : "Create Task"}
                       disabled={props.ActiveItem.title === ''}
                       className="bg-orange-500 px-5 py-2 text-white font-bold rounded-md w-full hover:bg-orange-600 disabled:bg-orange-400"/>
            </form>
        </div>
    )
}

export default FormWrapper;
