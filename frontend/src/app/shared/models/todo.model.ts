import {SeverityEnum} from "../enums/severity.enum";
import {TagModel} from "./tag.model";

export interface TodoModel {
  publicId?: string;
  task: string;
  done: boolean;
  dueDate: Date;
  severity: SeverityEnum;
  subtodos?: TodoModel[]
  tags: TagModel[]
}
