import { TodoListTypeEnum } from "../@enums/todo-list-type.enum";
import { TodoTaskType } from "./todo-task.type";

export interface TodoListType {
  id              : number,
  title           : string,
  type            : TodoListTypeEnum,
  taskCollection  : TodoTaskType[],
  compleatedTasks?: number,
  readyTasks?     : number
}
