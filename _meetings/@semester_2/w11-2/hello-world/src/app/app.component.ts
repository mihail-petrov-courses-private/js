import { Component } from '@angular/core';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';
  index = 0;

  public getTitle() {
    return "Function title";
  }

  public increment() {
    this.index++;
  }

  public decrement() {
    this.index--;
  }

}
