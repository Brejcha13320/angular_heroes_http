import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroesService ) { 
    this.cargando = true;
    this.heroesService.getHeroes()
        .subscribe( respuesta => {
          this.heroes = respuesta;
          this.cargando = false;
        } );
  }

  ngOnInit(): void {
  }

  deleteHeroe(heroe:HeroeModel, i: number){

    Swal.fire({
      title: '¿Esta Seguro?',
      text: `Esta seguro que desea borrar a ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( respuesta => {
      if(respuesta.value){
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }
    } )

  }



}
