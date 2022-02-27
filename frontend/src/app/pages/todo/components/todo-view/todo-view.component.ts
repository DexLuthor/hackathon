import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoModel} from "../../../../shared/models/todo.model";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent {
  @Input() todo?: TodoModel
  @Input() checkSound?: HTMLAudioElement
  expanded = false
  @Output() private readonly onComplete = new EventEmitter<boolean>();
  @Output() private readonly onDelete = new EventEmitter();
  @Output() private readonly onEdit = new EventEmitter();
  @Output() private readonly onSubtodoCheck = new EventEmitter<TodoModel>();

  isDone(): boolean {
    return this.todo?.done ?? false;
  }

  resolveSeverityIcon(): string {
    switch (String(this.todo?.severity)) {
      case "LOW":
        return "assets/images/one-chevron-up.svg";
      case "MIDDLE":
        return "assets/images/two-chevrons-up.svg";
      case "HIGH":
        return "assets/images/three-chevrons-up.svg";
    }
    return "assets/images/one-chevron-up.svg";//todo add fallback
  }

  onEditClicked(): void {
    // todo do not allow several editing at the same time
    this.onEdit.emit();
  }

  onDeleteClicked(): void {
    this.onDelete.emit();
  }

  complete(): void {
    const isDone = !(this.todo!.done);
    this.todo!.done = isDone;//todo is this necessary
    this.onComplete.emit(isDone);

    if (isDone) {
      this.checkSound?.play().then();//todo use shorter sound this current longs 2s
    }
  }

  onShrinkExpandClick(e: MouseEvent) {
    e.stopPropagation();
    this.expanded = !this.expanded;
  }

  resolveShrinkExpandIcon() {
    if (this.expanded) {
      return "assets/images/arrow-up-circle.svg";//todo remove the second svg and rotate the first on click
    } else {
      return "assets/images/arrow-down-circle.svg";
    }
  }

  onSubtaskCheckClicked($event: MouseEvent) {
    $event.stopPropagation();
  }

  onSubtaskCheckChanged(todo: TodoModel, $event: MatCheckboxChange) {
    const subtodos = [...this.todo?.subtodos!]
    const clickedSubtodo = subtodos.find(subtodo => subtodo.publicId === todo.publicId);
    if (clickedSubtodo) {
      clickedSubtodo.done = $event.checked;
    }

    const newTodo: TodoModel = {
      ...this.todo!,
      subtodos
    }

    this.onSubtodoCheck.emit(newTodo)
  }
}
