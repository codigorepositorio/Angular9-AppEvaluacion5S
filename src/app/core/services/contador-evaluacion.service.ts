import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContadorEvaluacionService {

  constructor() { }

  sumaContador:number=0;

  contador(con:number){ 

  return con++;

  }
}
