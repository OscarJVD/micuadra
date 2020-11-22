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
    // this.time1();
  }

  resetForm(form?: NgForm){
    if(form) form.reset();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(res => this.taskService.task = res as Task[])
  }

  // time1(date = new Date()) {
  //   let
  //       h = date.getHours(),
  //       m = date.getMinutes();

  //   return h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM');
  // }

  addTask(form: NgForm)
  {
    if(form.value._id){ // Actualizar tarea si llega solo el id
      this.taskService.putTask(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Tarea actualizada satisfactoriamente'})
        this.getTasks(); // Vuelve y muestra la tabla con la actualización
      })
    }else{
      delete form.value._id;
    // //   // console.log(form.value.byWhen);
    //     let byWhenBetter = form.value.byWhen.split("T");
    // // console.log(byWhenBetter);
    // byWhenBetter = byWhenBetter[0] + ' ' + byWhenBetter[1].substring(0,8);
    // byWhenBetter = new Date(byWhenBetter);
    // // console.log(byWhenBetter);

    // let
    //     h = byWhenBetter.getHours(),
    //     m = byWhenBetter.getMinutes();

    //     form.value.byWhen = byWhenBetter.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' ' + (h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM'));
    //     console.log(form.value.byWhen);
      // // return;
      this.taskService.postTask(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Tarea guardada con exito' })
        this.getTasks(); // Vuelve y muestra la tabla
      })
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
    }else this.getTasks();

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
      M.toast({ html: 'Tarea archivada con exito' })
      this.getTasks(); // Vuelve y muestra la tabla
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

}
