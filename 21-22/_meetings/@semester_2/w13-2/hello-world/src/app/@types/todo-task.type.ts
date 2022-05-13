import { TodoPriorityEnum } from "../@enums/todo-priority.enum";
import { TodoStatusEnum } from "../@enums/todo-status.enum";

export interface TodoTaskType {
  content: string;
  status  : TodoStatusEnum;
  priority: TodoPriorityEnum
}
