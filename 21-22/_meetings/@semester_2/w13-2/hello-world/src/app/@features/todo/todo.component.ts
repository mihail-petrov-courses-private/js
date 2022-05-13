import { Component } from "@angular/core";

@Component({
  selector    : 'app-todo',
  templateUrl :'./todo.component.html',
  styleUrls   :['./todo.component.scss'],
})
export class TodoComponent {
  public isListSelected = false;

  public onSelectList() {
    this.isListSelected = true;
  }
}
