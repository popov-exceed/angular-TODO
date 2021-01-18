import { Component, OnInit } from '@angular/core';
import {TodoService} from "../services/todo.service";
import { Task } from "../models/task";

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit{

  constructor(private todoService: TodoService) { }
  tasks: Task[];

  ngOnInit() {
    this.todoService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    })
  }


  removeTask(id: string) {
    this.todoService.removeTask(id);
  }
  toggleTask(id: string) {
    this.todoService.toggleTask(id);
  }

}
