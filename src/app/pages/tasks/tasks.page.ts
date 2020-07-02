import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  constructor(private taskService: TaskService) { }

  async ngOnInit() {
    this.taskService.tasks = await this.taskService.loadSaved() || []
  }

  getAllTasks() {
    return this.taskService.tasks || []
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
}
