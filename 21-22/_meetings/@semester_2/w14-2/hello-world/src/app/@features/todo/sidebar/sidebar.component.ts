import { Component, EventEmitter, Output } from "@angular/core";
import { TodoListTypeEnum } from "src/app/@enums/todo-list-type.enum";
import { TodoService } from "src/app/@services/todo.service";
import { TodoListType } from "src/app/@types/todo-list.type";

@Component({
  selector    : 'app-sidebar',
  templateUrl : './sidebar.component.html',
  styleUrls   : ['./sidebar.component.scss'],
})
export class SidebarComponent {

  public userListCollection: TodoListType[];
  public filterListCollection: TodoListType[];

  private listCollection: TodoListType[];

  @Output()
  public outputSelectedList = new EventEmitter();

  public constructor(private todoService: TodoService) {
    this.listCollection   = this.todoService.getTodoList();

    this.filterListCollection = this.listCollection.filter(list => {
      return list.type == TodoListTypeEnum.FILTER
    });

    this.userListCollection = this.listCollection.filter(list => {
      return list.type == TodoListTypeEnum.USER
    });
  }

  public onCreateNewList() {

    this.todoService.createNewList();
    this.updateUserList();
  }

  public onSelectList($listItem: TodoListType) {
    // this.todoService.selectListByIndex($listIndex);
    this.todoService.selectList($listItem);
    this.outputSelectedList.emit();
  }

  private updateUserList() {

    this.userListCollection = this.listCollection.filter(list => {
      return list.type == TodoListTypeEnum.USER
    });
  }
}
