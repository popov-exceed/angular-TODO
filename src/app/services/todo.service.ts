import { Injectable } from '@angular/core';
import {Task} from "../models/task";

const initialTodos: Task[] = JSON.parse(localStorage.getItem('todos')) || [];

@Injectable()
export class TodoService {

}
