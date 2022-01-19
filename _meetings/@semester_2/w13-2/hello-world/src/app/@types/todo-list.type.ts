import { TodoTaskType } from "./todo-task.type";

export interface TodoListType {
  title: string,
  taskCollection: TodoTaskType[],
  compleatedTasks: number,
  readyTasks: number
}
