import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    is_completed: [false],
    date: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private taskSerice: TaskService,
    private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskSerice.addTask(this.taskForm.value)
      this.taskForm.reset()
      this.router.navigateByUrl('/tasks')
    }
  }
}
