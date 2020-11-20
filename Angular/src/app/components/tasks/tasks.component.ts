import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importamos Proveedores
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/task';

declare var M: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  resetForm(form?: NgForm){
    if(form) form.reset();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(res => this.taskService.task = res as Task[])
  }

  addTask(form: NgForm)
  {
    if(form.value._id){

    }else{
      delete form.value._id;
      this.taskService.postTask(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Tarea guardada con exito' })
        this.getTasks();
      })
    }
  }

  // fillAssignmentDate(todayCheck: NgForm)
  // {
  //   console.log(todayCheck);
  // }

}
