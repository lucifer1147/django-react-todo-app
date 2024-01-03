import React, {useEffect, useState} from "react";
import FormWrapper from "./FormWrapper";
import ListWrapper from "./ListWrapper";

function TaskList(props) {
    const [TodoList, setTodoList] = useState([])
    const [EditingTask, changeEditingStatus] = useState(false)
    const [TitleLength, changeTitleLength] = useState(0)
    const [DescriptionLength, changeDescriptionLength] = useState(0)
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

    const currActiveItem = (reqId) => {
        if (ActiveItem.id !== reqId) {
            for (let item of TodoList) {
                let id = item.id
                if (id.toString() === reqId.toString()) {
                    setActiveItem(item)
                    changeEditingStatus(true)
                    changeTitleLength(item.title.length)
                    changeDescriptionLength(item.description.length)
                }
            }
        } else {
            changeEditingStatus(false)
            setActiveItem({
                id: null, title: '', description: '', completed: false,
            })
            changeTitleLength(0)
            changeDescriptionLength(0)
        }
    }

    return (
        <div id="task-container" className="px-36 py-12 flex gap-x-10 h-[82vh]">
            <FormWrapper ActiveItem={ActiveItem} EditingTask={EditingTask} getCookie={getCookie}
                         setActiveItem={setActiveItem} changeEditingStatus={changeEditingStatus}
                         TitleLength={TitleLength} DescriptionLength={DescriptionLength}
                         changeTitleLength={changeTitleLength} changeDescriptionLength={changeDescriptionLength}/>
            <ListWrapper changeEditingStatus={changeEditingStatus} currActiveItem={currActiveItem}
                         ActiveItem={ActiveItem}
                         TodoList={TodoList} EditingTask={EditingTask} getCookie={getCookie}
                         setActiveItem={setActiveItem}/>
        </div>
    )
}

export default TaskList;
