import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms'; // Facilita obtener el value de los inputs

// Importamos Proveedores
import { TravelService } from '../../services/travel.service';
import { Travel } from 'src/app/models/travel';

declare var M: any;

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css'],
  providers: [TravelService]
})

export class TravelsComponent implements OnInit {

  constructor(public travelService: TravelService) { }

  ngOnInit(): void {
    this.getTravels();
    this.getArchivedTravels();
    this.getDeletedTravels();
    this.getPremiumTravels();
    this.getCheapTravels();
    // this.time1();
  }

  resetForm(form?: NgForm){
    if(form) form.reset();
  }

  getTravels(){
    this.travelService.getTravels().subscribe(res => this.travelService.travel = res as Travel[])
  }

  getPremiumTravels(){
    this.travelService.getPremiumTravels().subscribe(res => this.travelService.premium = res as Travel[])
  }

  getCheapTravels(){
    this.travelService.getCheapTravels().subscribe(res => this.travelService.cheap = res as Travel[])
  }

  getArchivedTravels(){
    this.travelService.getArchivedTravels().subscribe(res => this.travelService.archived = res as Travel[])
  }

  getDeletedTravels(){
    this.travelService.getDeletedTravels().subscribe(res => this.travelService.deleted = res as Travel[])
  }


  // time1(date = new Date()) {
  //   let
  //       h = date.getHours(),
  //       m = date.getMinutes();

  //   return h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM');
  // }

  addTravel(form: NgForm)
  {
    if(form.value._id){ // Actualizar Viaje si llega solo el id
      this.travelService.putTravel(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Paquete de Viaje actualizado satisfactoriamente'})
        this.getTravels(); // Vuelve y muestra la tabla con la actualización
    this.getArchivedTravels();
    this.getDeletedTravels();

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
      this.travelService.postTravel(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Paquete de Viaje guardado con exito' })
        this.getTravels(); // Vuelve y muestra la tabla
    this.getArchivedTravels();
    this.getDeletedTravels();

      })
    }
  }

  // Buscador
  getTravelsByPlaceName(){ // Con esto se hace lo de abajo
    var value = (<HTMLInputElement>document.getElementById("search")).value;

    if(value != ''){
      var key_to_find = value;
      var filtered_e = this.travelService.travel.filter(el => {
        return el.placeName.toUpperCase().includes(key_to_find.toUpperCase());
      })
      this.travelService.travel = filtered_e as Travel[];
    }else {
      this.getTravels();
      this.getArchivedTravels();
      this.getDeletedTravels();
    }

    // console.log(value);
  }

  // fillAssignmentDate(todayCheck: NgForm)
  // {
  //   console.log(todayCheck);
  // }

  updateTravel(travel: Travel){
    window.scrollTo(0, 71);
    this.travelService.selectedTravel = travel; // cargar el paquete de viaje en el formulario para poder editar
  }

  updateStatusTravel(travel: Travel, form: NgForm){
    console.log(travel);
    console.log(typeof travel.status);
    this.travelService.putStatusTravel(travel).subscribe(res => {
      this.resetForm(form);
      if(travel.status != 1){
        M.toast({ html: 'Paquete de Viaje reactivado' })
      }else{
        M.toast({ html: 'Paquete de Viaje archivado con exito' })
      }
      this.getTravels(); // Vuelve y muestra la tabla
    this.getArchivedTravels();
    this.getDeletedTravels();

    })
  }

  softDeleteTravel(travel: Travel, form: NgForm){
    console.log(travel);
    console.log(typeof travel.status);
    if(confirm(`¿Esta seguro de que desea eliminar el paquete de viaje: "${travel.placeName}" ?`)){
      this.travelService.softDeleteTravel(travel).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Paquete de viaje eliminado' })
        this.getTravels(); // Vuelve y muestra la tabla
    this.getArchivedTravels();
    this.getDeletedTravels();

      })
    }
  }

  // deleteTravel(_id: string)
  // {
  //   if(confirm('¿Esta seguro de que desea eliminar esta Viaje de forma permanente?')){
  //     this.travelService.deleteTravel(_id).subscribe(res => {
  //       this.getTravels();
  //       M.toast({ html: "Viaje eliminada permanentemente"});
  //     })
  //   }
  // }

}
