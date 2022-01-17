import { Injectable } from "@angular/core";
import { TodoPriorityEnum } from "../@enums/todo-priority.enum";
import { TodoStatusEnum } from "../@enums/todo-status.enum";
import { TodoListType } from "../@types/todo-list.type";
import { TodoTaskType } from "../@types/todo-task.type";

@Injectable()
export class TodoService {

  private listCollection: TodoListType[];
  private selectedList:TodoListType|null = null;
  private selectedTask: TodoTaskType|null = null;
  private readonly TASK_COLLECTION = "TASK_COLLECTION";

  public constructor() {

    const taskCollection  =  localStorage.getItem("TASK_COLLECTION");
    this.listCollection   = (taskCollection) ? JSON.parse(taskCollection) : [];
  }

  public getTodoList() {
    return this.listCollection;
  }

  public getSelectedList() {
    return this.selectedList;
  }

  public getSelectedListTask(): TodoTaskType[]| [] {

    if(!this.selectedList) return [];
    return this.selectedList?.taskCollection;
  }

  public createNewList(title = "New list" ) {

    this.listCollection.push({
      title           : title,
      taskCollection  : [],
      compleatedTasks : 0,
      readyTasks      : 0
    });
    this.updateLocalTaskStorage();
  }

  public removeListByIndex(listIndex: number) {
    this.listCollection.splice(listIndex, 1);
  }

  public selectListByIndex(listIndex: number) {
    this.selectedList = this.listCollection[listIndex];
  }

  public updateListTitle(title: string) {

    if(!this.selectedList) return;
    this.selectedList.title = title;
  }

  public createNewTask(taskContent: string) {

    if(!this.selectedList) return;

    this.selectedList.taskCollection.push({
      content   : taskContent,
      priority  : TodoPriorityEnum.REGULAR,
      status    : TodoStatusEnum.READY
    });

    this.selectedList.readyTasks++;
    this.updateLocalTaskStorage();
  }

  public removeTaskByIndex(taskIndex: number) {

    if(!this.selectedList) return;
    this.selectedList.taskCollection.splice(taskIndex, 1);
    this.selectedList.readyTasks--;
    this.updateLocalTaskStorage();
  }

  public selectTaskByIndex(taskIndex: number) {

    if(!this.selectedList) return;
    this.selectedTask = this.selectedList.taskCollection[taskIndex];
  }

  public compleateTask($taskItem: TodoTaskType) {

    if(!this.selectedList) return;

    $taskItem.status = TodoStatusEnum.DONE;
    this.selectedList.compleatedTasks++;
    this.selectedList.readyTasks--;
    this.updateLocalTaskStorage();
  }

  private updateLocalTaskStorage() {
    localStorage.setItem(this.TASK_COLLECTION, JSON.stringify(this.listCollection));
  }
}
