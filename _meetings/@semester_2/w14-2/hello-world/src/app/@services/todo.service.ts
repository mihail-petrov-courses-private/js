import { Injectable } from "@angular/core";
import { TodoListTypeEnum } from "../@enums/todo-list-type.enum";
import { TodoPriorityEnum } from "../@enums/todo-priority.enum";
import { TodoStatusEnum } from "../@enums/todo-status.enum";
import { TodoListType } from "../@types/todo-list.type";
import { TodoTaskType } from "../@types/todo-task.type";

@Injectable()
export class TodoService {

  private listCollection: TodoListType[] = [];
  private selectedList:TodoListType|null = null;
  private selectedTask: TodoTaskType|null = null;
  private readonly TASK_COLLECTION = "TASK_COLLECTION";

  public constructor() {

    const taskCollection  =  localStorage.getItem("TASK_COLLECTION");
    const storedTaskCollection = (taskCollection) ? JSON.parse(taskCollection) : [];

    console.log('@@@');
    console.log(storedTaskCollection);

    if(storedTaskCollection.length == 0) {

      this.listCollection[TodoPriorityEnum.IMPORTANT] = {
        id              : TodoPriorityEnum.IMPORTANT,
        title           : "Important",
        type            : TodoListTypeEnum.FILTER,
        taskCollection  : []
      };

      this.listCollection[TodoPriorityEnum.REGULAR] = {
        id              : TodoPriorityEnum.REGULAR,
        title           : "Reular",
        type            : TodoListTypeEnum.FILTER,
        taskCollection  : []
      };
    }

    this.listCollection.push(...storedTaskCollection);

    console.log(this.listCollection);

    if(storedTaskCollection.length > 0) {
      this.fillFilterListCollection();
    }
  }

  public getTodoList() {
    return this.listCollection;
  }

  public getSelectedList() {
    return this.selectedList;
  }

  public getSelectedTask(): TodoTaskType | null {
    return this.selectedTask;
  }

  public getSelectedListTask(): TodoTaskType[]| [] {

    if(!this.selectedList) return [];
    return this.selectedList?.taskCollection;
  }

  public getListByListId($listId: TodoListType['id']): TodoListType| null {

    for(const list of this.listCollection) {

      if(list.id == $listId ) {
        return list;
      }
    }

    return null;
  }

  public createNewList(title = "New list" ) {

    let length  = this.listCollection.length;
    const index = ++length;

    this.listCollection.push({
      id              : index,
      title           : title,
      type            : TodoListTypeEnum.USER,
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

  public selectList($listItem: TodoListType)  {
    this.selectedList = this.getListByListId($listItem.id);
  }

  public updateListTitle(title: string) {

    if(!this.selectedList) return;
    this.selectedList.title = title;
  }

  public createNewTask(taskContent: string) {

    if(!this.selectedList) return;

    const listIndex         = this.selectedList.id;
    let length              = this.selectedList.taskCollection.length;
    const currentTaskIndex  = ++length;
    const taskIndex         = listIndex + "_" + currentTaskIndex;

    this.selectedList.taskCollection.push({
      id        : taskIndex,
      content   : taskContent,
      priority  : TodoPriorityEnum.REGULAR,
      status    : TodoStatusEnum.READY
    });

    // if(this.selectedList.readyTasks) {
    //   this.selectedList.readyTasks++;
    // }

    this.updateLocalTaskStorage();
  }

  public removeSelectedTask() {

    if(!this.selectedTask) return;
    this.removeTask(this.selectedTask);
  }

  public removeTask(task: TodoTaskType) {

    if(!this.selectedList) return;
    const taskIndex = this.getTaskIndex(task);

    if(taskIndex != null) {
      this.removeTaskByIndex(taskIndex);
    }
  }

  public removeTaskByIndex(taskIndex: number) {

    if(!this.selectedList) return;
    this.selectedList.taskCollection.splice(taskIndex, 1);
    // this.selectedList.readyTasks--;
    this.updateLocalTaskStorage();
  }

  public selectTaskByIndex(taskIndex: number) {

    if(!this.selectedList) return;
    this.selectedTask = this.selectedList.taskCollection[taskIndex];
  }

  // public compleateTask($taskItem: TodoTaskType) {

  //   if(!this.selectedList) return;

  //   $taskItem.status = TodoStatusEnum.DONE;
  //   this.selectedList.compleatedTasks++;
  //   this.selectedList.readyTasks--;
  //   this.updateLocalTaskStorage();
  // }

  public changeStatus($taskItem: TodoTaskType, $statusFlag: TodoStatusEnum) {

    $taskItem.status = $statusFlag;
    this.updateLocalTaskStorage();
  }

  public changePriority($taskItem: TodoTaskType, $priorityFlag: TodoPriorityEnum) {

    $taskItem.priority = $priorityFlag;
    this.updateLocalTaskStorage();
  }


  public updateSelectedTask($task: TodoTaskType) {
    this.selectedTask = $task;
  }

  private updateLocalTaskStorage() {
    localStorage.setItem(this.TASK_COLLECTION, JSON.stringify(this.listCollection));
  }

  private getTaskIndex(task: TodoTaskType) {

    if(!this.selectedList) return;

    for(let i = 0; i < this.selectedList.taskCollection.length; i++) {
        if(this.selectedList.taskCollection[i].id == task.id) {
          return i;
        }
    }

    return null;
  }

  private fillFilterListCollection() {

    const copyOfListCollection = this.listCollection.filter(list => {
      return list.type == TodoListTypeEnum.USER;
    });

    for(const listElement of copyOfListCollection) {

        const taskCollection = listElement.taskCollection;
        const len = listElement.taskCollection.length;
        for(let i = 0; i < len; i++ ) {

          const task = taskCollection[i];
          this.listCollection[task.priority].taskCollection.push(task);
        }
    }
  }
}
