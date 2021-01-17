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

    todos$: Observable<Task[]>;
    update$: BehaviorSubject<TodosOperation> = new BehaviorSubject<TodosOperation>((tasks: Task[]) => tasks);

    createTodo$: Subject<Task> = new Subject<Task>();
    removeTodo$: Subject<string> = new Subject<string>();
    toggleTodo$: Subject<string> = new Subject<string>();

    create$: Subject<Task> = new Subject<Task>();
    remove$: Subject<string> = new Subject<string>();
    toggle$: Subject<string> = new Subject<string>();


    constructor() {

        this.todos$ = this.update$.pipe(scan((tasks: Task[], operation: TodosOperation) => operation(tasks), initialTodos))
        this.todos$.forEach(tasks => localStorage.setItem('todo', JSON.stringify(tasks)));

        this.create$.pipe(map((task: Task): TodosOperation => {
            return (tasks: Task[]) => tasks.concat(task);
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
        
       
        
        this.createTodo$
        .subscribe(this.create$);

        this.removeTodo$
        .subscribe(this.remove$);
    }
    addTask(title: string): void {
       
        
        this.createTodo$.next({title, completed: false,id: uuidv4()});
    }

    removeTask(id: string): void {
        this.removeTodo$.next(id);
    }

    toggle(id: string): void {
        this.toggleTodo$.next(id);
      }
   
}
