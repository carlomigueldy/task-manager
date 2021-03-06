import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router) { }

  async ngOnInit() {
    this.taskService.tasks = await this.taskService.loadSaved() || []
  }

  getAllTasks() {
    const tasks = this.taskService.tasks || []
    
    if (! (tasks.length > 0)) {
      return []
    }

    return tasks.filter(item => !item.is_completed)
  }

  clearAll() {
    this.taskService.clearAll()
  }

  completed(id: number) {
    this.taskService.completed(id)
  }

  removeTask(id: number) {
    this.taskService.removeTask(id)
  }

  navigate(id: number) {
    console.log('[Navigate] to task id ' + id)
  }
}
