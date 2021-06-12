import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms'; // Facilita obtener el value de los inputs

// Importamos Proveedores
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

declare var M: any;

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  providers: [PetService]

})
export class PetsComponent implements OnInit {

  constructor(public petService: PetService) { }

  ngOnInit(): void {
    this.getPets();
    this.getArchivedPets();
    this.getDeletedPets();
    // this.time1();
  }

  resetForm(form?: NgForm){
    if(form) form.reset();
  }

  getPets(){
    this.petService.getPets().subscribe(res => this.petService.pet = res as Pet[])
  }

  getArchivedPets(){
    this.petService.getArchivedPets().subscribe(res => this.petService.archived = res as Pet[])
  }

  getDeletedPets(){
    this.petService.getArchivedPets().subscribe(res => this.petService.deleted = res as Pet[])
  }

  // time1(date = new Date()) {
  //   let
  //       h = date.getHours(),
  //       m = date.getMinutes();

  //   return h + ':' + ("0" + m).slice(-2) + (h > 12 ? 'PM' : 'AM');
  // }

  addPet(form: NgForm)
  {
    form.value.idUser = localStorage.getItem('sessionUserId');

    if(form.value._id){ // Actualizar Mascota si llega solo el id
      this.petService.putPet(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Mascota actualizada satisfactoriamente'})
        this.getPets(); // Vuelve y muestra la tabla con la actualización
            this.getArchivedPets();
    this.getDeletedPets();
      })
    }else{
      delete form.value._id;
      this.petService.postPet(form.value).subscribe(res => {
        console.log(res);
        console.log(res.valPet);
        console.log(res.status);

        if(res.status == 23000){
          return M.toast({html: `El tipo de mascota: ${res.valPet.type} ya existe`})
        }else{
          this.resetForm(form);
          M.toast({ html: 'Mascota guardada con exito' })
          this.getPets(); // Vuelve y muestra la tabla
              this.getArchivedPets();
    this.getDeletedPets();
        }
      })
    }
  }

  // Buscador
  getPetsByName(){ // Con esto se hace lo de abajo
    var value = (<HTMLInputElement>document.getElementById("searchPet")).value;

    if(value != ''){
      var key_to_find = value;
      var filtered_e = this.petService.pet.filter(el => {
        return el.name.toUpperCase().includes(key_to_find.toUpperCase());
      })
      this.petService.pet = filtered_e as Pet[];
    }else{
      this.getArchivedPets();
      this.getDeletedPets();
      this.getPets();
    }

    // console.log(value);
  }

  // fillAssignmentDate(todayCheck: NgForm)
  // {
  //   console.log(todayCheck);
  // }

  updatePet(pet: Pet){
    window.scrollTo(0, 71);
    this.petService.selectedPet = pet; // cargar la Mascota en el formulario para poder editar
  }

  updateStatusPet(pet: Pet, form: NgForm){
    console.log(pet);
    console.log(typeof pet.status);
    this.petService.putStatusPet(pet).subscribe(res => {
      this.resetForm(form);
      M.toast({ html: 'Mascota archivada con exito' })
      this.getPets(); // Vuelve y muestra la tabla
          this.getArchivedPets();
    this.getDeletedPets();
    })
  }

  softDeletePet(pet: Pet, form: NgForm){
    console.log(pet);
    console.log(typeof pet.status);
    if(confirm(`¿Esta seguro de que desea eliminar la Mascota: ${pet.name} ?`)){
      this.petService.softDeletePet(pet).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Mascota eliminada' })
        this.getPets(); // Vuelve y muestra la tabla
            this.getArchivedPets();
    this.getDeletedPets();
      })
    }
  }

  // deletePet(_id: string)
  // {
  //   if(confirm('¿Esta seguro de que desea eliminar esta Mascota de forma permanente?')){
  //     this.petService.deletePet(_id).subscribe(res => {
  //       this.getPets();
  //       M.toast({ html: "Mascota eliminada permanentemente"});
  //     })
  //   }
  // }

}
