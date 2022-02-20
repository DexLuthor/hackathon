import {SeverityEnum} from "../enums/severity.enum";

export interface TodoModel {
  publicId?: string
  task: string
  done: boolean
  severity: SeverityEnum
}
