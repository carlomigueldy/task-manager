import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
})
export class CompletedTasksPage implements OnInit {
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

    return tasks.filter(item => item.is_completed)
  }

  clearAllCompleted() {
    this.taskService.clearAllCompleted()
  }

  removeTask(id: number) {
    this.taskService.removeTask(id)
  }

  navigate(id: number) {
    console.log('[Navigate] to task id ' + id)
  }
}
