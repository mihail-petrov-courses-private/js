import { Component, ViewChild } from "@angular/core";

@Component({
  selector    : 'my-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {

  // декларирам променлива
  // която пази taskInput
  // @ViewChild('taskInput')
  // public taskInput: any;

  public taskContent = "";

  public taskCollection: any = [];

  // public saveDomTask($value: string) {

  //   console.log($value);
  //   console.log(this.taskInput.nativeElement.value);
  // }

  // public saveDynamicTask($event: any) {
  //   console.log($event);
  //   console.log($event.target.value);

  //   if($event.code == "Enter") {
  //     this.taskContent    = $event.target.value;
  //     $event.target.value = "";
  //   }
  // }

  public saveTask($event: any) {

    if($event.code != "Enter") {
      return;
    }

    this.taskContent    = $event.target.value;
    $event.target.value = "";
    this.taskCollection.push(this.taskContent);
  }

}

