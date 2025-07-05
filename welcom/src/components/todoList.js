import { useState } from "react";
import SampleData from '../utils/todo.json'

function TodoList() {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([...SampleData]);
    const handleInput = (e) => {
        setTodo(e.target.value);
    }
    const handleAdd = (e) => {
        setTodoList(pre => {
            return [...pre, {
                title: todo,
                completed: false
            }]
        });
        setTodo('');
    }
    const handleStatus = (id) => {
        console.log(id, typeof id);
        setTodoList(pre => {
            console.log(pre);
            return pre.map(data => data.id === id ? { ...data, completed: !data.completed } : data)
        })
    }
    const handleDelete = (id) => {
        setTodoList(pre => {
            return pre.filter(data => data.id !== id);
        })
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card w-50">
                    <div className="card-body">
                        <div className="d-flex justify-content-space-between align-items-center mb-3">
                            <input className="form-control" placeholder="Add your Todo" value={todo} name="todo" onChange={(e) => { handleInput(e) }} />
                            <button className="ms-3 btn btn-primary" disabled={todo.length === 0} onClick={(e) => { handleAdd(e) }}>Add</button>
                        </div>
                        {todoList.length > 0 && <>
                            <table className="table table-bordered align-middle">
                                <thead className="small">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Todo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="small">

                                    {todoList.map((todo, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td className={todo.completed ? 'text-decoration-line-through' : null}>{todo.title}</td>
                                            <td>
                                                {todo.completed ? <i className="bi bi-check fs-3 text-success " onClick={(e) => { handleStatus(todo.id) }}></i> :
                                                    <button className="btn btn-success btn-sm" onClick={(e) => { handleStatus(todo.id) }}><i className="bi bi-check"></i></button>}
                                                <button className="btn btn-danger btn-sm ms-2" onClick={(e) => { handleDelete(todo.id) }}><i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;