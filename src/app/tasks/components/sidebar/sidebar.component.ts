import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarItem } from '../../interfaces/sidebar-item';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class SidebarComponent {
  public router = inject( Router )
  public compacted: boolean = false;
  public  toggle = ():void => { this.compacted = !this.compacted }
  public sidebarItems: SidebarItem[] = [
    { router: 'list', title: 'Lista de tareas'},
    { router: 'create', title: 'Crear tarea'},
  ]


  
}
