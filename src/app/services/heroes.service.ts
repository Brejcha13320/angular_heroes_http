import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesappcrud-3c6d2-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearHeroe( heroe:HeroeModel ){
    
    const heroeTemporal = {
      nombre: heroe.nombre,
      poder: heroe.poder,
      vivo: heroe.vivo
    };

    return this.http.post(`${this.url}/heroes.json`, heroeTemporal )
        .pipe(
          map( (respuesta:any) => {
            heroe.id = respuesta.name;
            return heroe;
          } )
        );
  }

  actualizarHeroe( heroe: HeroeModel){

    const heroeTemporal = {
      nombre: heroe.nombre,
      poder: heroe.poder,
      vivo: heroe.vivo
    };

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemporal );
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
        .pipe(
          map( respuesta => this.crearArreglo(respuesta) ),
          delay(500)
        );
  }

  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObj: any){
    const heroes: HeroeModel[] = [];

    if(heroesObj === null){
      return [];
    } else {
      Object.keys( heroesObj ).forEach( (key) => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
        heroes.push(heroe);
      } );

      return heroes;
    }

  }

}
