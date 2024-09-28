import { Component, inject } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, MatButtonToggleModule, ReactiveFormsModule],
})
export class ListPageComponent {
  private taskService = inject(TaskService);
  public tasks: Task[] = [];
  public filterStatus: string = 'Todos'; 



  constructor() {}

  public ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  public onDeleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }

  public filterTasks(): Task[] {
    if (this.filterStatus === 'Pendientes') {
      return this.tasks.filter(task => task.state === 'Pendiente');
    } else if (this.filterStatus === 'Completadas') {
      return this.tasks.filter(task => task.state === 'Completada');
    } else {
      return this.tasks;
    }
  }

  public onCheckChange(event: Event, task: Task): void {
    const isChecked = (event.target as HTMLInputElement).checked;  
    task.state = isChecked ? 'Completada' : 'Pendiente';

  }
}
