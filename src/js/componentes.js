
import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTododoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');




export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTododoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});
divTododoList.addEventListener('click', (event) => {
    const nombreElemento = (event.target.localName); // Esto nos va a mostar si es un inpt, label,button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { //click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { // Hay que borrar el todo

        todoList.eliminarTodo(todoId);
        divTododoList.removeChild(todoElemento);
    }

});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTododoList.children.length - 1; i >= 0; i--) {

        const elemento = divTododoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTododoList.removeChild(elemento);
        }


    }
})

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) { return }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    for (const elemento of divTododoList.children) {

        elemento.classList.remove('hidden');
        const completados = elemento.classList.contains('completed');

        switch (filtro) {


            case 'Pendientes':
                if (completados) {
                    elemento.classList.add('hidden');

                }
                break;


            case 'completados':
                if (!completados) {
                    elemento.classList.add('hidden');

                }
                break;
        }




    }






});

