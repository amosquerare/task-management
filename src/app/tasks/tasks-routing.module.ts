import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksLayoutComponent } from './layouts/tasks-layout/tasks-layout.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  { 
    path: '', component: TasksLayoutComponent,
    children: [ 
      { path: 'create', component: CreatePageComponent },
      { path: 'list', component: ListPageComponent },
      { path: '**', redirectTo: 'list' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
