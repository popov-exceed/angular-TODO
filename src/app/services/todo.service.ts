import { Injectable } from '@angular/core';
import {Task} from "../models/task";
import { BehaviorSubject,Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

const initialTodos: Task[] = JSON.parse(localStorage.getItem('todo')) || [];

type TodosOperation = (tasks: Task[]) => Task[];

@Injectable({
    providedIn: "root"
})
export class TodoService {

    tasks$: Observable<Task[]>;

    update$: BehaviorSubject<TodosOperation> = new BehaviorSubject<TodosOperation>((tasks: Task[]) => tasks);


    create$: Subject<string> = new Subject<string>();
    remove$: Subject<string> = new Subject<string>();
    toggle$: Subject<string> = new Subject<string>();


    constructor() {

        this.tasks$ = this.update$.pipe(scan((tasks: Task[], operation: TodosOperation) => operation(tasks), initialTodos));
        this.tasks$.forEach(tasks => localStorage.setItem('todo', JSON.stringify(tasks)));

        this.create$.pipe(map((title: string): TodosOperation => {
            return (tasks: Task[]) => tasks.concat({title, completed: false,id: uuidv4()});
          }))
        .subscribe(this.update$);

        this.remove$.pipe(map((id: string): TodosOperation => (tasks: Task[]) => tasks.filter(task => task.id !== id)))
        .subscribe(this.update$);

         this.toggle$.pipe(map((id: string): TodosOperation => {
            return (tasks: Task[]) => {
              const task = tasks.find(task => task.id === id);
              task.completed = !task.completed;
              return tasks;
            };
          }))
        .subscribe(this.update$);
        
       
    
    }
    addTask(title: string): void {
        this.create$.next(title);
    }

    removeTask(id: string): void {
        this.remove$.next(id);
    }

    toggleTask(id: string): void {
        this.toggle$.next(id);
    }
   
}
