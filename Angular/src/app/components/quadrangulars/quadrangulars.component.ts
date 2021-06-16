import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Facilita obtener el value de los inputs

// Importamos Proveedores
import { QuadrangularService } from '../../services/quadrangular.service';
import { Quadrangular } from 'src/app/models/quadrangular';

declare var M: any;

@Component({
  selector: 'app-quadrangulars',
  templateUrl: './quadrangulars.component.html',
  styleUrls: ['./quadrangulars.component.css'],
  providers: [QuadrangularService]
})
export class QuadrangularsComponent implements OnInit {

  constructor(public quadrangularService: QuadrangularService) { }

  ngOnInit(): void {
    this.getQuadrangulars();
    this.getLeagues();
    this.getArchivedQuadrangulars();
    this.getDeletedQuadrangulars();
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
  //   document.getElementById('tabErrorQuadrangular').click();
  // }

  getQuadrangulars(){
    this.quadrangularService.getQuadrangulars().subscribe(res => this.quadrangularService.quadrangular = res as Quadrangular[])
  }

  getLeagues(){
    this.quadrangularService.getLeagues().subscribe(res => this.quadrangularService.leagues = res as Quadrangular[])

    console.log(this.quadrangularService.leagues)
    console.log(this.quadrangularService.getLeagues())
  }


  getArchivedQuadrangulars(){
    this.quadrangularService.getArchivedQuadrangulars().subscribe(res => this.quadrangularService.archived = res as Quadrangular[])
  }

  getDeletedQuadrangulars(){
    this.quadrangularService.getDeletedQuadrangulars().subscribe(res => this.quadrangularService.deleted = res as Quadrangular[])
  }


  // time1(date = new Date()) {
  //   let
  //       h = date.getHours(),
  //       m = date.getMinutes();

  //   return h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM');
  // }

  addQuadrangular(form: NgForm)
  {
      if(form.value._id){ // Actualizar cuadrangular si llega solo el id
        M.toast({html: 'Cuadrangular actualizada satisfactoriamente'})
          this.quadrangularService.putQuadrangular(form.value).subscribe(res => {
          this.resetForm(form);
          this.getQuadrangulars(); // Vuelve y muestra la tabla con la actualización
          this.getArchivedQuadrangulars();
          this.getDeletedQuadrangulars();

        })
      }else{
        delete form.value._id;

        if(form.value.secondCoupleScore.length !== 5
          || isNaN(parseInt(form.value.secondCoupleScore[0]))
          || !/\s/.test(form.value.secondCoupleScore[1])
          || form.value.secondCoupleScore[2] != "-"
          || !/\s/.test(form.value.secondCoupleScore[3])
          || isNaN(parseInt(form.value.secondCoupleScore[4]))
           ){
          return M.toast({ html: 'El formato requerido para el marcador es Ej: 0 - 0' })
        }

        if(form.value.firstCoupleScore.length !== 5
          || isNaN(parseInt(form.value.firstCoupleScore[0]))
          || !/\s/.test(form.value.firstCoupleScore[1])
          || form.value.firstCoupleScore[2] != "-"
          || !/\s/.test(form.value.firstCoupleScore[3])
          || isNaN(parseInt(form.value.firstCoupleScore[4]))
           ){
          return M.toast({ html: 'El formato requerido para el marcador es Ej: 0 - 0' })
        }

        this.quadrangularService.postQuadrangular(form.value).subscribe(res => {
          M.toast({ html: 'Cuadrangular iniciada con exito' })
          this.resetForm(form);
          this.getQuadrangulars(); // Vuelve y muestra la tabla
          this.getArchivedQuadrangulars();
          this.getDeletedQuadrangulars();

        })
      }
  }

  // Buscador
  getQuadrangularsByScore(){ // Con esto se hace lo de abajo
    var value = (<HTMLInputElement>document.getElementById("search")).value;

    if(value != ''){
      var key_to_find = value;
      var filtered_e = this.quadrangularService.quadrangular.filter(el => {
        return el.firstCoupleScore.toUpperCase().includes(key_to_find.toUpperCase());
      })
      this.quadrangularService.quadrangular = filtered_e as Quadrangular[];
    }else {
      this.getQuadrangulars();
      this.getArchivedQuadrangulars();
      this.getDeletedQuadrangulars();
    }

    // console.log(value);
  }

  getPosByTeamName(){ // Con esto se hace lo de abajo
    var value = (<HTMLInputElement>document.getElementById("search")).value;

    if(value != ''){
      var key_to_find = value;
      var filtered_e = this.quadrangularService.quadrangular.filter(el => {
        return el.firstTeam.toUpperCase().includes(key_to_find.toUpperCase());
      })
      this.quadrangularService.quadrangular = filtered_e as Quadrangular[];
    }else {
      this.getQuadrangulars();
      this.getArchivedQuadrangulars();
      this.getDeletedQuadrangulars();
    }

    // console.log(value);
  }

  updateQuadrangular(quadrangular: Quadrangular){
    window.scrollTo(0, 71);
    this.quadrangularService.selectedQuadrangular = quadrangular; // cargar la cuadrangular en el formulario para poder editar
  }

  updateStatusQuadrangular(quadrangular: Quadrangular, form: NgForm){
    console.log(quadrangular);
    console.log(typeof quadrangular.status);
    this.quadrangularService.putStatusQuadrangular(quadrangular).subscribe(res => {
      this.resetForm(form);
      if(quadrangular.status != 1){
        M.toast({ html: 'Cuadrangular reactivada' })
      }else{
        M.toast({ html: 'Cuadrangular pausada con exito' })
      }
      this.getQuadrangulars(); // Vuelve y muestra la tabla
    this.getArchivedQuadrangulars();
    this.getDeletedQuadrangulars();

    })
  }

  softDeleteQuadrangular(quadrangular: Quadrangular, form: NgForm){
    console.log(quadrangular);
    console.log(typeof quadrangular.status);
    if(confirm(`¿Esta seguro de que desea terminar la cuadrangular: "${quadrangular.firstCoupleScore} ${quadrangular.secondCoupleScore}" ?`)){
      this.quadrangularService.softDeleteQuadrangular(quadrangular).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Cuadrangular terminada' })
        this.getQuadrangulars(); // Vuelve y muestra la tabla
    this.getArchivedQuadrangulars();
    this.getDeletedQuadrangulars();

      })
    }
  }

  // deleteQuadrangular(_id: string)
  // {
  //   if(confirm('¿Esta seguro de que desea eliminar esta cuadrangular de forma permanente?')){
  //     this.quadrangularService.deleteQuadrangular(_id).subscribe(res => {
  //       this.getQuadrangulars();
  //       M.toast({ html: "Cuadrangular eliminada permanentemente"});
  //     })
  //   }
  // }

  // document.getElementById('tabErrorQuadrangular').click();
  // document.addEventListener('DOMContentLoaded', () => {
  // })

}
