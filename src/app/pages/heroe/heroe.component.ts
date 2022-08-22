import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesServices: HeroesService, private route: ActivatedRoute ) {
    const id = this.route.snapshot.paramMap.get('id') + "";

    /* console.log(id); */

    if(id !== 'nuevo'){
      this.heroesServices.getHeroe(id)
          .subscribe( (respuesta: any) => {
            this.heroe = respuesta;
            this.heroe.id = id;
          })
    }

  }

  ngOnInit(): void {
  }

  guardar(formulario:NgForm){

    if(formulario.invalid){
      return ;
    } else {

      Swal.fire({
        title: 'Espere',
        text: 'Guardando Información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();

      let peticion:Observable<any>;

      if(this.heroe.id){
        peticion = this.heroesServices.actualizarHeroe(this.heroe);
      } else {
        peticion = this.heroesServices.crearHeroe(this.heroe);
      }

      peticion.subscribe( respuesta => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se Actualiza Correctamente',
          icon: 'success'
        });
      });





    }
  }

}
