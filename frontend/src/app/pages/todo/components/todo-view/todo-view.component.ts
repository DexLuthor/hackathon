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
  @Output() private readonly onChecked = new EventEmitter<boolean>();
  @Output() private readonly onDelete = new EventEmitter();
  @Output() private readonly onEdit = new EventEmitter();


  onCheckClicked(event: MouseEvent): void {
    event.stopPropagation();

    const isDone = !(this.todo!.done);
    this.todo!.done = isDone;//todo is this necessary
    this.onChecked.emit(isDone);

    if (isDone) {
      this.checkSound?.play().then();//todo use shorter sound this current longs 2s
    }
  }

  isDone(): boolean {
    return this.todo?.done ?? false;
  }

  resolveSeverityIcon(): string {
    switch (this.todo?.severity) {
      case 0:
        return "assets/images/chevron-up.svg";
      case 1:
      case 2:
        return "assets/images/chevrons-up.svg";
    }
    return "assets/images/chevron-up.svg";//todo add fallback
  }

  onEditClicked(): void {
    // todo do not allow several editing at the same time
    this.onEdit.emit();
  }

  onDeleteClicked(): void {
    this.onDelete.emit();
  }

}
