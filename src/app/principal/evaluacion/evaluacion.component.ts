import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FasesService } from 'src/app/core/services/fases.service';
import { PreguntasService } from 'src/app/core/services/preguntas.service';
import { AreaService } from 'src/app/core/services/area.service';
import { Area } from 'src/app/core/models/area.';
import { ContadorEvaluacionService } from 'src/app/core/services/contador-evaluacion.service';


declare var Jquery: any;
declare var $: any;
@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class EvaluacionComponent implements OnInit {
  title = "Ejecucion de Jquery desde Angular 8"
  items: MenuItem[];
  items2: MenuItem[];

  //checked: boolean = false;
  
  arrayFases = [];
  arrayPreguntas = [];
  nombrefases = [];
  descripcionfases = [];

  FaseDataFiltro = [];

  FaseUno = [];
  FaseDos = [];
  FaseTres = [];
  FaseCuatro = [];
  FaseCinco = [];

  activeIndex: number = 0
  areas: any[];
  periodos: any[];
  sumaPuntos:number;


  selectedCities: string[] = [];
  selectedCategories: string[] = ['Technology', 'Sports'];

  checked1: boolean = false;
  checked2: boolean = true;
  isActivo:boolean=false;
  constructor(
    private service: FasesService,
    private pservice: PreguntasService,
    private areaService :AreaService,
    private contadorEvaluacionService:ContadorEvaluacionService
  ) { }

  ngOnInit() {
    

    this.items2=[
      {
        label:"Nuevo",
        icon:'pi pi-fw pi-plus',
       // command:() => this.ShowSaveDialog(true)
      } ,
      {
        label:"Editar",
        icon:'pi pi-fw pi-pencil',
        //command:() => this.ShowSaveDialog(true)
      } 
    ]
    this.putPregunta();
    
    this.ConsultaFases();
    this.ConsultaPreguntas();
    this.llenaCombo();
    this.getArea();
    


  }//fin OnInt  


  

  ConsultaFases() {

    this.service.consultaFases().subscribe(
      res => {
        console.log(res);
        this.arrayFases = res;
        let a = this.arrayFases.length
        for (let i = 0; i < a; i++) {
          let nombre = this.arrayFases[i].nombre
          let descripcion = this.arrayFases[i].descripcion
          this.nombrefases.push(nombre)
          this.descripcionfases.push(descripcion)
          this.FasesItems();
        }
      }
    )
  }

  FasesItems() {
    this.items = [{
      label: this.nombrefases[0],
      command: (event: any) => {
        this.activeIndex = 0
      }
    },
    {
      label: this.nombrefases[1],
      command: (event: any) => {
        this.activeIndex = 1;

      },
    },
    {
      label: this.nombrefases[2],
      command: (event: any) => {
        this.activeIndex = 2;
      },
    },
    {
      label: this.nombrefases[3],
      command: (event: any) => {
        this.activeIndex = 3;
      },
    },

    {
      label: this.nombrefases[4],
      command: (event: any) => {
        this.activeIndex = 4;
      },

    },

    ]
  }

  llenaCombo() {
    this.periodos = [
      { name: 'Enero 01 - 15 Enero 2020', code: 'Enero-I' },
      { name: 'Enero 16 - 31 Enero 2020', code: 'Enero-II' },
      { name: 'Febrero 01 - 28 Febrero 2020', code: 'Febrero-I' },
      { name: 'Marzo 01 - 15 Marzo 2020', code: 'Marzo-I' },
      { name: 'Marzo 16 - 31 Marzo 2020', code: 'Marzo-II' },
      { name: 'Abril 01 - 15 Abril 2020', code: 'Abril-I' },
    ]
  }

  ConsultaPreguntas() {
    let me = this;
    this.pservice.getPreguntas('1').subscribe(data => {            

      let acumulador=0;        
      this.FaseDataFiltro = data;
        for (var i = 0; i < this.FaseDataFiltro.length; i++) {
          acumulador = Number(acumulador) + Number(this.FaseDataFiltro[i].puntaje)
        }
        console.log("contador: ",acumulador);
        this.sumaPuntos = acumulador;
        // console.log("preguntas: " , this.FaseDataFiltro);
        me.FaseUno = me.FaseDataFiltro.filter(fa => fa.idFase    == 1);
        me.FaseDos = me.FaseDataFiltro.filter(fa => fa.idFase    ==  2);
        me.FaseTres = me.FaseDataFiltro.filter(fa => fa.idFase   ==  3);
        me.FaseCuatro = me.FaseDataFiltro.filter(fa => fa.idFase ==  4);
        me.FaseCinco = me.FaseDataFiltro.filter(fa => fa.idFase  ==  5);       
        
        
    })
  }          

  putPregunta() { 
    // let acumulador=0;  
    // for (var i = 0; i < this.FaseDataFiltro.length; i++) {
    //   this.sumaPuntos = Number(acumulador) + Number(this.FaseDataFiltro[i].puntaje)
    // }
    // console.log("aaaaaaaaaaaa",acumulador,this.FaseDataFiltro);
    //this.sumaPuntos = acumulador;
    return this.sumaPuntos 
  }

  

      getArea() {
        return this.areaService.getAreas().subscribe((response: Area[]) => {
          this.areas = response
          console.log("areas..........", this.areas);
        },
          error => console.error(error))
      }
  

  toggleTitle() {
    console.log('Le as dado click al boton');
    $('.title').slideToggle();

  }


}
