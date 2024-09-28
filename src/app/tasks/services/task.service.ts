import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task'; // Asegúrate de tener la interfaz Task

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private localStorageKey = 'tasks';

  constructor() { }

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTask(task: any): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  deleteTask(index: number): void {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  clearTasks(): void {
    localStorage.removeItem(this.localStorageKey);
  }

}
