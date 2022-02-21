import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {TodoModel} from "../../../../shared/models/todo.model";
import {SeverityEnum} from "../../../../shared/enums/severity.enum";

@Component({
  selector: 'todo-bottom-sheet',
  templateUrl: './todo-bottom-sheet.component.html',
  styleUrls: ['./todo-bottom-sheet.component.scss']
})
export class TodoBottomSheetComponent implements OnInit {
  edittingTodo?: TodoModel
  task: string = "";
  dueDate: string = "";
  severity?: SeverityEnum;

  constructor(public bottomSheetRef: MatBottomSheetRef<TodoBottomSheetComponent>) {
  }

  ngOnInit(): void {
    this.edittingTodo = this.bottomSheetRef.containerInstance.bottomSheetConfig.data['todo'] as TodoModel;
    this.task = this.edittingTodo.task
    this.dueDate = new Date(this.edittingTodo.dueDate).toISOString().slice(0, 16)
    this.severity = this.edittingTodo.severity
  }

  save(): void {
    const updatedTodo = {
      ...this.edittingTodo,
      task: this.task,
      dueDate: new Date(this.dueDate)
    };
    this.bottomSheetRef.dismiss(updatedTodo);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
