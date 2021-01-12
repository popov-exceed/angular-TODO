import {Component, Input, EventEmitter, Output} from "@angular/core";
import { Task} from "../models/task";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html"
})

export class TaskComponent {

  @Output() handleToggle = new EventEmitter();
  @Output() handleRemove = new EventEmitter();

  @Input() task: Task;



  toggle(){
    this.handleToggle.next(this.task.id);
  }

  remove(){
    this.handleRemove.next(this.task.id);
  }
}
