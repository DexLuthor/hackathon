import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TodoModel} from "../../../../shared/models/todo.model";

@Component({
  selector: 'todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit, OnChanges {
  @Input() todo?: TodoModel

  ngOnInit(): void {
    if (!this.todo) {
      throw new Error("Todo input is not initialized");
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.todo) {
      throw new Error("Todo input is not initialized");
    }
  }

}
