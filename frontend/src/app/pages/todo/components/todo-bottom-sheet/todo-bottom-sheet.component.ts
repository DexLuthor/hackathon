import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {TodoModel} from "../../../../shared/models/todo.model";

@Component({
  selector: 'todo-bottom-sheet',
  templateUrl: './todo-bottom-sheet.component.html',
  styleUrls: ['./todo-bottom-sheet.component.scss']
})
export class TodoBottomSheetComponent implements OnInit {
  edittingTodo?: TodoModel
  task: string = "";

  constructor(public bottomSheetRef: MatBottomSheetRef<TodoBottomSheetComponent>) {
  }

  ngOnInit(): void {
    this.edittingTodo = this.bottomSheetRef.containerInstance.bottomSheetConfig.data['todo'] as TodoModel;
    this.task = this.edittingTodo.task
  }

  save(): void {
    this.bottomSheetRef.dismiss({
      ...this.edittingTodo,
      task: this.task
    });
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }
}
