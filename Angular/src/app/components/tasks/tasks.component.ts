import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Facilita obtener el value de los inputs

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
    this.getArchivedTasks();
    this.getDeletedTasks();
    // this.time1();
    // this.errorTab();
  }

  resetForm(form?: NgForm){
    if(form) form.reset();
  }

  showInputs(eleName){
    document.getElementById(`hide${eleName}`).classList.remove('d-n')
  }

  // errorTab(){
  //   document.getElementById('tabErrorTask').click();
  // }

  getTasks(){
    this.taskService.getTasks().subscribe(res => this.taskService.task = res as Task[])
  }

  getArchivedTasks(){
    this.taskService.getArchivedTasks().subscribe(res => this.taskService.archived = res as Task[])
  }

  getDeletedTasks(){
    this.taskService.getDeletedTasks().subscribe(res => this.taskService.deleted = res as Task[])
  }


  // time1(date = new Date()) {
  //   let
  //       h = date.getHours(),
  //       m = date.getMinutes();

  //   return h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM');
  // }

  addTask(form: NgForm)
  {
    let byWhen = (<HTMLInputElement>document.getElementById("byWhen")).value;
    let assignmentDate = (<HTMLInputElement>document.getElementById("assignmentDate")).value;

    console.log(byWhen, assignmentDate);
    if(byWhen != '' && assignmentDate != ''){
      form.value.byWhen = byWhen;
      form.value.assignmentDate = assignmentDate;

      if(form.value._id){ // Actualizar tarea si llega solo el id
        M.toast({html: 'Tarea actualizada satisfactoriamente'})
          this.taskService.putTask(form.value).subscribe(res => {
          this.resetForm(form);
          this.getTasks(); // Vuelve y muestra la tabla con la actualización
          this.getArchivedTasks();
          this.getDeletedTasks();

        })
      }else{
        delete form.value._id;
        // // return;
        this.taskService.postTask(form.value).subscribe(res => {
          console.log(form.value.assignmentDate);
          console.log(form.value);
          M.toast({ html: 'Tarea guardada con exito' })
          this.resetForm(form);
          this.getTasks(); // Vuelve y muestra la tabla
          this.getArchivedTasks();
          this.getDeletedTasks();

        })
      }
    }else{
      M.toast({ html: 'Completa todos los campos' })
    }
  }

  // Buscador
  getTasksByTitle(){ // Con esto se hace lo de abajo
    var value = (<HTMLInputElement>document.getElementById("search")).value;

    if(value != ''){
      var key_to_find = value;
      var filtered_e = this.taskService.task.filter(el => {
        return el.title.toUpperCase().includes(key_to_find.toUpperCase());
      })
      this.taskService.task = filtered_e as Task[];
    }else {
      this.getTasks();
      this.getArchivedTasks();
      this.getDeletedTasks();
    }

    // console.log(value);
  }

  // fillAssignmentDate(todayCheck: NgForm)
  // {
  //   console.log(todayCheck);
  // }

  updateTask(task: Task){
    window.scrollTo(0, 71);
    this.taskService.selectedTask = task; // cargar la tarea en el formulario para poder editar
  }

  updateStatusTask(task: Task, form: NgForm){
    console.log(task);
    console.log(typeof task.status);
    this.taskService.putStatusTask(task).subscribe(res => {
      this.resetForm(form);
      if(task.status != 1){
        M.toast({ html: 'Tarea reactivada' })
      }else{
        M.toast({ html: 'Tarea archivada con exito' })
      }
      this.getTasks(); // Vuelve y muestra la tabla
    this.getArchivedTasks();
    this.getDeletedTasks();

    })
  }

  softDeleteTask(task: Task, form: NgForm){
    console.log(task);
    console.log(typeof task.status);
    if(confirm(`¿Esta seguro de que desea eliminar la tarea con título: "${task.title}" ?`)){
      this.taskService.softDeleteTask(task).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Tarea eliminada' })
        this.getTasks(); // Vuelve y muestra la tabla
    this.getArchivedTasks();
    this.getDeletedTasks();

      })
    }
  }

  // deleteTask(_id: string)
  // {
  //   if(confirm('¿Esta seguro de que desea eliminar esta tarea de forma permanente?')){
  //     this.taskService.deleteTask(_id).subscribe(res => {
  //       this.getTasks();
  //       M.toast({ html: "Tarea eliminada permanentemente"});
  //     })
  //   }
  // }

  // document.getElementById('tabErrorTask').click();
  // document.addEventListener('DOMContentLoaded', () => {
  // })

}
