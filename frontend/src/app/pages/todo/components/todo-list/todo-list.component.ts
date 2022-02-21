import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Subscription} from "rxjs";
import {TodoModel} from "../../../../shared/models/todo.model";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TodoBottomSheetComponent} from "../todo-bottom-sheet/todo-bottom-sheet.component";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: TodoModel[] = [];
  readonly checkSound: HTMLAudioElement = new Audio();
  private subscription: Subscription | undefined

  constructor(private todoService: TodoService,
              private bottomSheet: MatBottomSheet) {
    this.checkSound.src = "assets/sounds/check-sound.mp3";
    this.checkSound.load();
  }

  ngOnInit(): void {
    this.subscription = this.todoService.todos$
      .subscribe(todos => {
        this.todos = todos;
      });

    this.todoService.fetchTodos();
  }

  onChecked(todo: TodoModel, isDone: boolean) {
    this.todoService.update({
      ...todo,
      done: isDone
    });
  }

  onAddTodo(todo: TodoModel) {
    this.todoService.save(todo);
  }

  onDelete(id: string) {
    this.todoService.delete(id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onEdit(todo: TodoModel) {
    const bottomSheetRef = this.bottomSheet.open(TodoBottomSheetComponent, {
      data: {todo}
    });

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.todoService.update(result);
      }
    });
  }
}
