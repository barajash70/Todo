
import '../styles.css'

import { Todo } from './todo.class.js';
import { TodoList } from './todo-list.class'
import { crearTodoHtml } from '../js/componentes';


export const todoList = new TodoList();


// todoList.todos.forEach(todo => crearTodoHtml(todo));

// console.log(todoList);


export { Todo } from './todo.class';
export { TodoList } from './todo-list.class';


const tarea = new Todo('Aprender JavaScript');

console.log(tarea);