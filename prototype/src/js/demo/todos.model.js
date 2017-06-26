import {observable, computed, reaction} from 'mobx'


export default class TodoStore{
  @observable todos = [];

  addTodo(todo){
    this.todos.push(todo);
  }

  changeTodo(todo, index){
    this.todos[index] = todo;
  }
}
