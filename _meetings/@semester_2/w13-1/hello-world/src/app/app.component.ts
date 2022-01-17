import { Component      } from "@angular/core";
import { TitleMode      } from "./@enums/title-mode.enum";
import { TodoStatusEnum } from "./@enums/todo-status.enum";
import { TodoListType   } from "./@types/todo-list.type";
import { TodoTaskType   } from "./@types/todo-task.type";
import { TodoService    } from "./@services/todo.service";

@Component({
  selector    : 'my-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss'],
  providers   : [TodoService]
})
export class AppComponent {

  public listCollection: TodoListType[];
  public titleMode: TitleMode = TitleMode.VIEW;

  public constructor(
    private todoService: TodoService
  ) {
    this.listCollection = this.todoService.getTodoList();
  }

  public onSaveTask($event: any) {

    if($event.code != "Enter") return;

    const taskContent    = $event.target.value;
    $event.target.value  = "";
    this.todoService.createNewTask(taskContent);
  }

  public onCreateNewList() {
    this.todoService.createNewList();
  }

  public onSelectList($listIndex: number) {
    this.todoService.selectListByIndex($listIndex);
  }

  public onChangeTitleModeToEdit() {
    this.titleMode = TitleMode.EDIT;
  }

  public onSaveTitle($value: string) {

    this.todoService.updateListTitle($value);
    this.titleMode = TitleMode.VIEW;
  }

  public onRemoveTask($index: number) {
    this.todoService.removeTaskByIndex($index);
  }

  public onCompleateTask($taskItem: TodoTaskType) {
    this.todoService.compleateTask($taskItem);
  }

  public getSelectedList() {
    return this.todoService.getSelectedList();
  }

  public getSelectedTaskCollection(): TodoTaskType[] {
    return this.todoService.getSelectedListTask();
  }

  public isInTitleViewMode(): boolean {
    return this.titleMode == TitleMode.VIEW;
  }

  public isInTitleEditMode(): boolean {
    return this.titleMode == TitleMode.EDIT;
  }

  public isProcessable($taskItem: TodoTaskType): boolean {
    return $taskItem.status == TodoStatusEnum.READY;
  }
}
