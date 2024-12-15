// src/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    // 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    // todos가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        if (inputValue.trim() === '') return;
        setTodos([...todos, { text: inputValue, completed: false }]);
        setInputValue('');
    };

    const toggleComplete = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditValue(todos[index].text);
    };

    const saveEdit = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, text: editValue } : todo
        );
        setTodos(newTodos);
        setEditIndex(null);
        setEditValue('');
    };

    return (
        <>
        <div className="sideBar">
            <ul>
                <li>Todo List</li>
            </ul>
        </div>
        <div className="main">
            <div className="todoWr">
                <div className="addTodoWr">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="할 일을 입력하세요"
                    />
                    <button className="confirm" onClick={addTodo}>등록하기</button>
                </div>

                <div className="todoList">
                    <h2>TO DO</h2>
                    <ul>
                        {todos.filter(todo => !todo.completed).map((todo, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(index)}
                                />
                                {editIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <button className="edit" onClick={() => saveEdit(index)}>수정</button>
                                        <button className="delete" onClick={() => setEditIndex(null)}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={todo.text}
                                            disabled
                                         />
                                        <button className="edit" onClick={() => startEdit(index)}>수정</button>
                                        <button className="delete" onClick={() => removeTodo(index)}>삭제</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="doneList">
                    <h2>DONE</h2>
                    <ul>
                        {todos.filter(todo => todo.completed).map((todo, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(index)}
                                />
                                <input
                                    type="text"
                                    value={todo.text}
                                    disabled
                                />
                                <button className="delete" onClick={() => removeTodo(index)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default TodoList;
