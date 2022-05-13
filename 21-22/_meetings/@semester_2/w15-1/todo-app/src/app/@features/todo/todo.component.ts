import { Component } from "@angular/core";
import { TodoService } from "src/app/@services/todo.service";
import { TodoTaskType } from "src/app/@types/todo-task.type";

@Component({
  selector    : 'app-todo',
  templateUrl :'./todo.component.html',
  styleUrls   :['./todo.component.scss'],
})
export class TodoComponent {
  public isListSelected;
  public isTaskSelected;
  public selectedTask: TodoTaskType | null;

  public constructor(private todoService: TodoService) {

    this.selectedTask   = null;
    this.isListSelected = false;
    this.isTaskSelected = false;
  }

  public onSelectList() {
    this.isListSelected = true;
  }

  public onSelectTask() {

    this.selectedTask   = this.todoService.getSelectedTask();
    this.isTaskSelected = true;
  }

  public onCloseMeta() {
    this.isTaskSelected = false;
  }
}
