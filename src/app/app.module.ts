import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//For PrimeNG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PrimeNG
import {PanelModule} from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCommonModule } from './app.common.module';
import { UserIdleModule } from 'angular-user-idle';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


// import { FormEstampadoComponent } from "./principal/components/form-estampado/form-estampado.component";
import { DropdownModule, DialogModule, Dialog } from "primeng/primeng";

import { AyudaComponent } from './ayuda/ayuda.component';
import { EvaluacionComponent } from './principal/evaluacion/evaluacion.component';
import { PreguntasEvaluacionComponent } from './preguntas-evaluacion/preguntas-evaluacion.component';

import { PreguntasComponent } from './Medicion/preguntas/preguntas.component';
import { AreasComponent } from './Medicion/areas/areas.component';


declare var $: any;
console.log(`jQuery version: ${$.fn.jquery}`);
// import { DashboardComponent } from "./principal/dashboard/dashboard.component";
// import { IngresoComponent } from "./ingreso/ingreso.component";

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    //DashboardComponent,

    LayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    AyudaComponent,
    EvaluacionComponent,
    PreguntasEvaluacionComponent,
    
    PreguntasComponent,
    
    AreasComponent,
    

    
    // FormEstampadoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // estampadosService,
    UserIdleModule.forRoot({ idle: 300, timeout: 1, ping: null }),

    //For PrimeNG
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    // Dialog,
    //PrimeNG
    /* PanelModule,
    ToastModule,
    ProgressSpinnerModule,
    ButtonModule, */

    AppCommonModule
  ],
  providers: [
    //PrimeNG
    MessageService
    // Dialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
