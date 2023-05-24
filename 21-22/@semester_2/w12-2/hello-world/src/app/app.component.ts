import { Component } from "@angular/core";
import { TitleMode } from "./@enums/title-mode.enum";
import { TodoPriorityEnum } from "./@enums/todo-priority.enum";
import { TodoStatusEnum } from "./@enums/todo-status.enum";
import { TodoListType } from "./@types/todo-list.type";
import { TodoTaskType } from "./@types/todo-task.type";

@Component({
  selector    : 'my-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {

  public listCollection: TodoListType[] = [];
  private selectedListIndex: number = -1;
  public titleMode: TitleMode = TitleMode.VIEW;

  public saveTask($event: any) {

    if($event.code != "Enter") {
      return;
    }

    const taskContent    = $event.target.value;
    $event.target.value   = "";

    const collection = this.getSelectedTaskCollection();
    collection.push({
      content   : taskContent,
      priority  : TodoPriorityEnum.REGULAR,
      status    : TodoStatusEnum.READY
    })
  }

  public removeTask($index: number) {

    const collection = this.getSelectedTaskCollection();
    collection.splice($index, 1);
  }

  public compleateTask($taskItem: TodoTaskType) {
    $taskItem.status = TodoStatusEnum.DONE;
  }

  public isProcessable($taskItem: TodoTaskType): boolean {
    return $taskItem.status == TodoStatusEnum.READY;
  }

  public createNewList() {
    this.listCollection.push({
      title           : "New list",
      taskCollection  : []
    });
  }

  public selectList($listIndex: number) {
    this.selectedListIndex = $listIndex;
  }

  public getSelectedList() {
    return this.listCollection[this.selectedListIndex];
  }

  public getSelectedTaskCollection(): TodoTaskType[] {
    return this.listCollection[this.selectedListIndex]?.taskCollection;
  }

  public changeTitleModeToEdit() {
    this.titleMode = TitleMode.EDIT;
  }

  public isInTitleViewMode(): boolean {
    return this.titleMode == TitleMode.VIEW;
  }

  public isInTitleEditMode(): boolean {
    return this.titleMode == TitleMode.EDIT;
  }

  public saveTitle($value: string) {

    this.getSelectedList().title = $value;
    this.titleMode = TitleMode.VIEW;
  }
}

