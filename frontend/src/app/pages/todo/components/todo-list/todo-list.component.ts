import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Subscription} from "rxjs";
import {TodoModel} from "../../../../shared/models/todo.model";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {TodoBottomSheetComponent} from "../todo-bottom-sheet/todo-bottom-sheet.component";
import {TagService} from "../../services/tag.service";
import {TagModel} from "../../../../shared/models/tag.model";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: TodoModel[] = [];
  tags: TagModel[] = [];
  readonly checkSound: HTMLAudioElement = new Audio();
  private todoSubscription: Subscription | undefined
  private tagSubscription: Subscription | undefined

  constructor(private todoService: TodoService,
              private tagService: TagService,
              private bottomSheet: MatBottomSheet) {
    this.checkSound.src = "assets/sounds/check-sound.mp3";
    this.checkSound.load();
  }

  ngOnInit(): void {
    this.todoSubscription = this.todoService.todos$
      .subscribe(todos => {
        this.todos = todos;
        console.log(todos)
      });
    this.tagSubscription = this.tagService.tags$
      .subscribe(tags => {
        this.tags = tags;
      });

    this.todoService.fetchTodos();
    this.tagService.fetchAll();
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

  onEdit(todo: TodoModel) {
    const bottomSheetRef = this.bottomSheet.open(TodoBottomSheetComponent, {
      data: {todo},
      panelClass: 'bottom-sheet'
    });

    bottomSheetRef.afterDismissed().subscribe((result: TodoModel) => {
      console.log(result);
      if (result) {
        this.todoService.update(result);
      }
    });
  }

  onChipClicked(tag: TagModel, newActiveState: boolean) {
    this.tagService.update({
      ...tag,
      active: newActiveState
    });
    // this.todoService.fetchTodos();
  }

  onChipAdded(title: string) {
    this.tagService.save({
      tag: title,
      active: true
    });
  }

  ngOnDestroy(): void {
    this.todoSubscription?.unsubscribe();
    this.tagSubscription?.unsubscribe();
  }

  onCheckSubtodo(todo: TodoModel) {
    this.todoService.update(todo);
  }
}
