import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Array<Task> = []

  constructor() { }

  addTask(task: Task) {
    this.tasks.push(task)
  }
}
