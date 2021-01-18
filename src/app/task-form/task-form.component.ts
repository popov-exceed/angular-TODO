import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form: FormGroup = new FormGroup({title: new FormControl('', Validators.required)});
  constructor(private todoService: TodoService) { }

  addTask() {
    const {title} = this.form.value;
    this.todoService.addTask(title);
    this.form.reset();
  }


}
