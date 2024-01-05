import React, {useState} from 'react';
import ListItem from "./ListItem";

function ListWrapper(props) {
    const handleSearchUpdate = (event) => {
        updateSearch(event.target.value)
    }

    const [search, updateSearch] = useState('')

    return (
        <div id="list-wrapper"
             className="w-1/2 flex flex-col">
            <div
                className="sticky h-22 px-16 py-10 w-full top-[0px] bg-indigo-100 mb-5 dark:bg-indigo-950 rounded-xl bg-opacity-80 dark:bg-opacity-70 backdrop-blur-sm">
                <input type="text" name="search-field" value={search} onChange={handleSearchUpdate}
                       className="focus:outline-0 px-3 py-1 w-full rounded-md dark:bg-gray-900 dark:text-white bg-opacity-70 dark:bg-opacity-70"
                       placeholder="Search Tasks Here..."/>
            </div>

            <div
                className="px-16 py-16 bg-indigo-100 dark:bg-indigo-950 shadow-black shadow-2xl rounded-xl overflow-x-auto dark:text-white bg-opacity-80 dark:bg-opacity-70 backdrop-blur-sm h-full">
                <ul className="flex flex-col justify-center gap-y-3">
                    {(props.TodoList.length > 0 ? props.TodoList.toReversed().map((obj) => {
                        return (
                            (obj.title + obj.description).toString().toLowerCase().includes(search.toLowerCase()) ? (
                                <ListItem obj={obj} ActiveItem={props.ActiveItem} currActiveItem={props.currActiveItem}
                                          setActiveItem={props.setActiveItem}
                                          changeEditingStatus={props.changeEditingStatus}
                                          changeDescriptionLength={props.changeDescriptionLength}
                                          changeTitleLength={props.changeTitleLength} getCookie={props.getCookie}/>
                            ) : (
                                <div className="hidden" key={obj.id}></div>
                            )
                        )
                    }) : (
                        <div
                            className="px-12 py-5 w-full rounded-md bg-white shadow-sm dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70">
                            <h3 className="text-lg font-bold text-center">No Tasks Yet...</h3>
                            <p className="text-center">Add Some to get Started</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListWrapper;
