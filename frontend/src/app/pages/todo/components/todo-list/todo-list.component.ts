import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {TodoModel} from "../../../../shared/models/todo.model";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos?: Observable<TodoModel[]>;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todos = this.todoService.fetchTodos();
  }

}
