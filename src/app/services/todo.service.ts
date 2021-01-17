import { Injectable } from '@angular/core';
import {Task} from "../models/task";
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const initialTodos: Task[] = JSON.parse(localStorage.getItem('todos')) || [];

@Injectable({
    providedIn: "root"
})
export class TodoService {
    public tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);


    addTask(title: string){
        const items = this.tasks.value;
        items.push({title, completed: false,id: uuidv4()});
        this.tasks.next(items);

    }

    removeTask(id: string) {
        const items = this.tasks.value;
        this.tasks.next(items.filter((task) => task.id !== id));
    }
}
