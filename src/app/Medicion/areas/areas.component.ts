import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/core/models/area.';
import { AreaService } from 'src/app/core/services/area.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FasesService } from 'src/app/core/services/fases.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { NULL_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[];
  cols: any[];

  edicion:boolean=false;

  items: MenuItem[];
  //Inicio: Variables Agregar Nuevo preguntas
  displaySaveDialog: boolean=false;

  area: Area = {
    idArea: 0, nombre: null, descripcion: null
  };

  selectedArea: Area = {
    idArea: null, nombre: null, descripcion: null
  }

  constructor(private areaService: AreaService, private messageService: MessageService) { }

  ngOnInit() {
    this.getArea();

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.ShowSaveDialog(false)
      },
      {
        label: "Editar",
        icon: 'pi pi-fw pi-pencil',
        command: () => this.ShowSaveDialog(true)
      }
    ]

    this.cols = [
      { field: "idArea", header: "item" },
      { field: "nombre", header: "Nombre" },
      { field: "descripcion", header: "Descripcion" },
    ];

  }

  getArea() {
    this.areaService.getAreas().subscribe(

      (result: any) => {

        let areas: Area[] = [];

        for (let i = 0; i < result.length; i++) {
          let area = result[i] as Area;
          areas.push(area);
        }
        this.areas = areas    
      },
      error => {
        console.log(error);
      }
    )
  }

  createArea() {
 

 
   if(!this.edicion)
   {
      this.areaService.createArea(this.area).subscribe(
        (result: any) => {
          let area = result as Area;
          this.areas.push(area);      
          this.addSingle();
          this.area.descripcion = null;
          this.area.nombre = null;
          this.displaySaveDialog = false;
          this.getArea();
        },
        error => {
          console.log(error);
        }
      )
   }
   else{
    {
      this.areaService.PutArea(this.area).subscribe(
        (result: any) => {
          let area = result as Area;
          //this.areas.push(area);
          console.log("aresasssssd  ", this.areas)
          this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se modifico el aréa correctamente.' });
          this.displaySaveDialog = false;  
          this.getArea()
          return
        },
        error => {
          console.log(error);
        }
      )
     }
   }

  
  }


  Cancelar() {
    this.displaySaveDialog = false;
    this.area.descripcion = null;
    this.area.nombre = null;

  }

  ShowSaveDialog(editar: boolean) {
  this.edicion=editar;
    if (editar) {
      if (this.selectedArea.idArea != null) {
        this.area = this.selectedArea;        
      }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Seleccione un registro.' });
        return;
      }

    } else {
      this.area = new Area();
    }

    this.displaySaveDialog = true;
  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Resultado', detail: 'Se guardo el aréa correctamente.' });
  }




}
