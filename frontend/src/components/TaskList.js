import React, {useEffect, useState} from "react";
import FormWrapper from "./FormWrapper";
import ListWrapper from "./ListWrapper";

function TaskList(props) {
    const [TodoList, setTodoList] = useState([])
    const [EditingTask, changeEditingStatus] = useState(false)
    const [ActiveItem, setActiveItem] = useState({
        id: null, title: '', description: '', completed: false,
    })

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const fetchTasks = async () => {
        let task = await fetch('http://localhost:8000/api/task-list/').then(response => response.json())
        // let task = []
        setTodoList(task)
    }

    useEffect(() => {
        fetchTasks()
    })

    const handleChange = (event, desg) => {
        let value = event.target.value

        if (desg === 'input') {
            setActiveItem({
                id: ActiveItem.id, title: value, description: ActiveItem.description, completed: ActiveItem.completed,
            })
        } else if (desg === 'text-area') {
            setActiveItem({
                id: ActiveItem.id, title: ActiveItem.title, description: value, completed: ActiveItem.completed
            })
        } else if (desg === 'checkbutton') {
            setActiveItem({
                id: ActiveItem.id,
                title: ActiveItem.title,
                description: ActiveItem.description,
                completed: event.target.checked,
            })
        }
    }

    const currActiveItem = (reqId) => {
        if (ActiveItem.id !== reqId) {
            for (let item of TodoList) {
                let id = item.id
                if (id.toString() === reqId.toString()) {
                    setActiveItem(item)
                    changeEditingStatus(true)
                }
            }
        } else {
            changeEditingStatus(false)
            setActiveItem({
                id: null, title: '', description: '', completed: false,
            })
        }
    }

    const handleDelete = (event, id) => {
        let url = 'http://localhost:8000/api/task-delete/' + id + '/'
        fetch(url, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            // mode: 'same-origin'
        })


        setTimeout(() => {
            setActiveItem({
                id: null, title: '', description: '', completed: false,
            })
            changeEditingStatus(false)
            console.log(EditingTask)
        }, 100)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let url = 'http://localhost:8000/api'
        if (EditingTask) {
            url = url + '/task-update/' + ActiveItem.id.toString() + '/'
        } else {
            url = url + '/task-create/'
        }

        fetch(url, {
            method: 'POST', headers: {
                'content-type': 'application/json',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                'X-CSRFToken': getCookie('csrftoken')
            },
            // mode: 'same-origin',
            body: JSON.stringify(ActiveItem)
        }).then(response => {
            if (!EditingTask) {
                setActiveItem({
                    id: null, title: '', description: '', completed: false,
                })
            }
        }).catch((error) => {
            console.error(error)
        })

    }

    return (
        <div id="task-container" className="px-36 py-12 flex gap-x-10 h-[82vh]">
            <FormWrapper handleChange={handleChange} handleSubmit={handleSubmit} ActiveItem={ActiveItem}
                         EditingTask={EditingTask}/>
            <ListWrapper handleDelete={handleDelete} currActiveItem={currActiveItem} ActiveItem={ActiveItem}
                         TodoList={TodoList} EditingTask={EditingTask}/>
        </div>
    )
}

export default TaskList;
