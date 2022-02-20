import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {TodoModel} from "../../../../shared/models/todo.model";
import {SeverityEnum} from "../../../../shared/enums/severity.enum";

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  activeSeverity: SeverityEnum = SeverityEnum.LOW
  task = "";
  @Output() private readonly onAddTodo = new EventEmitter<TodoModel>()

  ngOnInit(): void {
  }

  onClick() {

  }

  onCheckClicked($event: MouseEvent) {

  }

  @HostListener('window:keyup.enter')
  pressEnter(): void {
    this.onAddTodo.emit({
      task: this.task,
      severity: this.activeSeverity,
      done: false
    });

    this.task = "";
    this.activeSeverity = SeverityEnum.LOW;
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

  onCalendarClick(): void {

  }
}
