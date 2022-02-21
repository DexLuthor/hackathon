import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {TodoModel} from "../../../../shared/models/todo.model";
import {SeverityEnum} from "../../../../shared/enums/severity.enum";
import {SnackBarService} from "../../../../shared/services/snack-bar.service";

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  activeSeverity: SeverityEnum = SeverityEnum.LOW
  task = "";
  dueDate = '';
  @Output() private readonly onAddTodo = new EventEmitter<TodoModel>()

  constructor(private snackBarService: SnackBarService) {

  }

  @HostListener('window:keyup.enter')
  pressEnter(): void {
    const dueDate = new Date(this.dueDate);
    if (!this.isInputValid(dueDate)) {
      return;
    }

    this.onAddTodo.emit({
      task: this.task,
      severity: this.activeSeverity,
      dueDate: dueDate,
      done: false
    });

    this.task = '';
    this.activeSeverity = SeverityEnum.LOW;
    this.dueDate = '';
  }

  isInputValid(dueDate: Date): boolean {
    if (this.task.length < 1) {
      this.snackBarService.openSnackBar("2Do task must be longer");
      return false;
    } else if (dueDate < new Date()) {
      this.snackBarService.openSnackBar("Due date must be in the future");
      return false;
    }
    return true;
  }

  onSeverityIconClick(id: number): void {
    switch (id) {
      case 0:
        this.activeSeverity = SeverityEnum.LOW;
        break;
      case 1:
        this.activeSeverity = SeverityEnum.MIDDLE;
        break;
      case 2:
        this.activeSeverity = SeverityEnum.HIGH;
        break;
    }
  }

  isDone(): boolean {
    return false;
  }

}
