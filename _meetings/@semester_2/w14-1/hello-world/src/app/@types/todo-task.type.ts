import { TodoPriorityEnum } from "../@enums/todo-priority.enum";
import { TodoStatusEnum } from "../@enums/todo-status.enum";

export interface TodoTaskType {
  id: string,
  content: string;
  status  : TodoStatusEnum;
  priority: TodoPriorityEnum
}
