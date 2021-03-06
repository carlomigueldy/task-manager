import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = []

  constructor(private storage: Storage) {}

  /**
   * Add a new task and save in local storage.
   * 
   * @param { Task } task 
   */
  addTask(task: Task) {
    let newTask = task
    newTask['id'] = this.tasks.map(item => item.id).reduce((a, b) => Math.max(a, b)) + 1
    this.tasks.push(newTask)

    this.save()
  }

  /**
   * Remove a specific task based on id.
   * 
   * @param id number
   */
  completed(id: number) {
    const index = this.tasks.findIndex(item => item.id === id)
    this.tasks[index].is_completed = true

    this.save()
  }

  /**
   * Remove a specific task based on id.
   * 
   * @param id number
   */
  removeTask(id: number) {
    const index = this.tasks.findIndex(item => item.id === id)
    this.tasks.splice(index, 1)

    this.save()
  }

  /**
   * Clear all tasks from local storage.
   * 
   * @return { void }
   */
  public clearAll(): void {
    this.storage.remove('tasks')
    this.tasks = []
  }
  
  /**
   * Clear all tasks from local storage.
   * 
   * @return { void }
   */
  public async clearAllCompleted(): Promise<void> {
    const tasks = await this.loadSaved()

    this.tasks = tasks.filter(item => !item.is_completed)

    this.save()
  }
  
  /**
   * Save all task to local storage.
   * 
   * @return { void }
   */
  private save(): void {
    this.storage.set('tasks', this.tasks)
  }

  /**
   * Load all saved tasks from local storage.
   * 
   * @return { void }
   */
  async loadSaved(): Promise<Task[]> {
    console.log('[Task Service] Load saved tasks', await this.storage.get('tasks'))
    return await this.storage.get('tasks')
  }
}
