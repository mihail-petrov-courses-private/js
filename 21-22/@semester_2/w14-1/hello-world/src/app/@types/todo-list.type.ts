import { TodoTaskType } from "./todo-task.type";

export interface TodoListType {
  id : number,
  title: string,
  taskCollection: TodoTaskType[],
  compleatedTasks: number,
  readyTasks: number
}
