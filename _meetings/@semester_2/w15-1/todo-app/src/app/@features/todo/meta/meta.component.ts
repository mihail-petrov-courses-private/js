import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TodoService } from "src/app/@services/todo.service";
import { TodoTaskType } from "src/app/@types/todo-task.type";

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent {

  @Output()
  public outputCloseEvent = new EventEmitter();

  @Input()
  public inputTodoTask: TodoTaskType| null;

  public isInViewMode: boolean = false;
  public isInEditMode: boolean = false;

  public constructor(private todoService: TodoService) {

    this.inputTodoTask  = null;
    this.isInViewMode   = true;
  }

  public onClose() {
    this.outputCloseEvent.emit();
  }

  public onSwitchToEditMode() {

    this.isInViewMode = false;
    this.isInEditMode = true;
  }

  public onUpdateTask($event: any) {

    if(!this.inputTodoTask    ) return;
    if($event.code != "Enter" ) return;

    const $value = $event.target.value;
    this.inputTodoTask.content = $value;
    this.todoService.updateSelectedTask(this.inputTodoTask);
  }

  public onRemoveTask() {

    this.todoService.removeSelectedTask();
    this.onClose();
  }
}
