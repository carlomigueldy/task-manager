import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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

  loading
  
  constructor(
    private formBuilder: FormBuilder,
    private taskSerice: TaskService,
    private router: Router,
    public loadingController: LoadingController) {}

  ngOnInit() {
  }

  async onSubmit() {
    this.startLoading()
    
    if (this.taskForm.valid) {
      setTimeout(() => {
        this.taskSerice.addTask(this.taskForm.value)
        this.taskForm.reset()
        this.router.navigateByUrl('/tasks')
        this.endLoading()
    }, 1500)
    } else {
      this.endLoading()
    }
  }

  async startLoading(): Promise<void> {
    this.loading = this.loadingController.create({
      message: 'Please wait...',
      duration: 0
    });
    
    (await this.loading).present()
  }

  async endLoading(): Promise<void> {
    (await this.loading).dismiss()
  }
}
