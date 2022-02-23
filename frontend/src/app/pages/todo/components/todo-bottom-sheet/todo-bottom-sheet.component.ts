import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {TodoModel} from "../../../../shared/models/todo.model";
import {TagModel} from "../../../../shared/models/tag.model";
import {TagService} from "../../services/tag.service";

@Component({
  selector: 'todo-bottom-sheet',
  templateUrl: './todo-bottom-sheet.component.html',
  styleUrls: ['./todo-bottom-sheet.component.scss']
})
export class TodoBottomSheetComponent implements OnInit {
  edittingTodo?: TodoModel

  task: string = "";
  dueDate: string = "";
  severity?: number;
  availableTags?: TagModel[];

  constructor(private bottomSheetRef: MatBottomSheetRef<TodoBottomSheetComponent>,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.edittingTodo = this.bottomSheetRef.containerInstance.bottomSheetConfig.data['todo'] as TodoModel;
    this.task = this.edittingTodo.task
    this.dueDate = new Date(this.edittingTodo.dueDate).toISOString().slice(0, 16)
    this.severity = this.edittingTodo.severity
    this.tagService.tags$
      .subscribe(tags => {
        this.availableTags = [...tags.map(t => {
          return {...t, active: false};
        })];
        this.edittingTodo?.tags.forEach(linkedTag => {
          const find = this.availableTags?.find(tag => tag.tag === linkedTag.tag);
          if (find) {
            find.active = linkedTag.active
          }
        });
      });
  }

  save(): void {
    const updatedTodo = {
      ...this.edittingTodo,
      severity: this.severity,
      task: this.task,
      dueDate: new Date(this.dueDate),
      tags: this.availableTags?.filter(t => t.active)
    };
    this.bottomSheetRef.dismiss(updatedTodo);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

  isTodoTaggedWith(tag: TagModel) {
    return this.edittingTodo!.tags.filter(t => t.tag === tag.tag).length > 0;
  }

  onTagClicked(clickedTag: TagModel, newActiveState: boolean) {
    const find = this.availableTags?.find(tag => tag.tag === clickedTag.tag);
    if (find) {
      find.active = newActiveState;
    }
  }

  chooseSeverity(severity: number) {
    this.severity = severity;
  }
}
