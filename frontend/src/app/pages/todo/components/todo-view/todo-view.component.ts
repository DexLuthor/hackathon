import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoModel} from "../../../../shared/models/todo.model";

@Component({
  selector: 'todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent {
  @Input() todo?: TodoModel
  @Input() checkSound?: HTMLAudioElement
  @Output() private readonly onComplete = new EventEmitter<boolean>();
  @Output() private readonly onDelete = new EventEmitter();
  @Output() private readonly onEdit = new EventEmitter();

  isDone(): boolean {
    return this.todo?.done ?? false;
  }

  resolveSeverityIcon(): string {
    console.log(String(this.todo?.severity))
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
}
