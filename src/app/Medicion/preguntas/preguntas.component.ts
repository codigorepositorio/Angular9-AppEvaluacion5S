import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/core/services/preguntas.service';
import { Preguntas } from 'src/app/core/models/Preguntas.model';
import { Fases } from 'src/app/core/models/Fases.model';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/components/common/menuitem';
declare var Jquery: any;
declare var $: any;
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {


  //menu

  items:MenuItem[];
    //Inicio:Varibles para crear una nueva Pregunta 
  codFase: any;
  nombre: string;
  puntaje: number;
  isActivo: false;
  model: Preguntas;

  preguntas: Preguntas[];

  cantidaRegistros: number
  selectpreguntas: Preguntas;
  //Fin-----------------------------------------

  //Inicio: Carga Combo Fases------------------------
  fases: Fases[];
  arrayFases = [];
  //Fin

  mensajeError: string = '';
  
  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean = false;  

  constructor(private preguntasService: PreguntasService, private messageService: MessageService) { }

  ngOnInit() {
    this.getPregunta();
    this.getFase();
    this.ConsultaFases();

    this.items=[
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
        command:() => this.ShowSaveDialog(true)
      } ,
      {
        label:"Editar",
        icon:'pi pi-fw pi-pencil',
        command:() => this.ShowSaveDialog(true)
      } 
    ]    
  }

  getPregunta() {
    return this.preguntasService.getPreguntas('0').subscribe((response: Preguntas[]) => {
      this.preguntas = response
      this.cantidaRegistros = this.preguntas.length;
    },
      error => console.error(error))
  }

  postPregunta() {

    this.model = {
      idPregunta: 0,
      idFase: this.codFase.idFase,
      nombre: this.nombre,
      descripcion: "null",
      puntaje: this.puntaje,
      isActivo: this.isActivo,
      IsPreguntaActivo: ""
    }
    console.log(this.model);

    this.preguntasService.createPregunta(this.model).subscribe(
      res => {
        this.nombre = null;
        this.puntaje = 0;
        this.isActivo = false;
        this.mensajeError = null;
        //this.preguntas.push(this.model);        
        this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo correctamente la Pregunta.' });
        this.displaySaveDialog = false;
        this.getPregunta();
      },

      err => {
        console.log(err);
        // console.log(err.error);
        this.mensajeError = err.error;
      }
    );
  }

  // sumaPuntos:number=0
  // putPregunta() { 
  //   let acumulador=0;  
  //   for (var i = 0; i < this.preguntas.length; i++) {
  //     acumulador = Number(acumulador) + Number(this.preguntas[i].puntaje)
  //   }
  //   this.sumaPuntos = acumulador
  //   return (this.sumaPuntos)    
  // }

  delPregunta(id: number) {
     const idPregunta: any = {
     idPregunta: id
    }
    
    this.preguntasService.eliminaPreguntas(idPregunta).subscribe(
      res => {

        // console.log(this.preguntas);
        // //QUITAR
        // //Obtener el id del que se va a filtrar
        // let idFiltrar = idPregunta;

        // //Busco el array que voy a borrar
        // let obtenerArray = this.preguntas.find(element => element.idPregunta == idFiltrar);

        // //obtengo el indice de array para borrar
        // let indiceBorrar = this.preguntas.indexOf(obtenerArray);

        // //borro del array de la busqueda
        // this.preguntas.splice(indiceBorrar, 1);

        // console.log(this.preguntas);
        // //this.contadorPuntos=0;
        // //this.putPregunta();
         this.getPregunta();
      },

      err => {
        alert(idPregunta);
        console.log(idPregunta);
        console.log("Ocurrio algún error");
      }
    );    
  }

  habilitaPregunta(id: number) {
    
    const idPregunta: any = {
      idPregunta: id
    }
    this.preguntasService.HabilitaPreguntas(idPregunta).subscribe(
      res => {
        console.log(this.preguntas);
        this.getPregunta();        
      },
      err => {        
        console.log("Ocurrio algún error");
      }
    );
  }

  getFase() {
    return this.preguntasService.getFases().subscribe((response: Fases[]) => {
      this.fases = response
     },
      error => console.error(error))
  }

  ConsultaFases() {

    this.preguntasService.getFases().subscribe(
      res => {
        console.log(res);
        this.arrayFases = res;
        let a = this.arrayFases.length
      }
    )
  }

  ShowSaveDialog(editar: boolean) {

      this.displaySaveDialog = true;
    }  

}


