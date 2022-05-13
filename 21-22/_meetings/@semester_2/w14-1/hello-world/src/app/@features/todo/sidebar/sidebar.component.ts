import { Component, EventEmitter, Output } from "@angular/core";
import { TodoService } from "src/app/@services/todo.service";
import { TodoListType } from "src/app/@types/todo-list.type";

@Component({
  selector    : 'app-sidebar',
  templateUrl : './sidebar.component.html',
  styleUrls   : ['./sidebar.component.scss'],
})
export class SidebarComponent {

  public listCollection: TodoListType[];

  @Output()
  public outputSelectedList = new EventEmitter();

  public constructor(private todoService: TodoService) {
    this.listCollection = this.todoService.getTodoList();
  }

  public onCreateNewList() {
    this.todoService.createNewList();
  }

  public onSelectList($listIndex: number) {
    this.todoService.selectListByIndex($listIndex);
    this.outputSelectedList.emit();
  }
}
