import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './admin.guard';
import { AyudaComponent } from './ayuda/ayuda.component';
import { EvaluacionComponent } from './principal/evaluacion/evaluacion.component';
import { PreguntasComponent } from './Medicion/preguntas/preguntas.component'

const routes: Routes = [
  // { path: "dashboard", component: DashboardComponent },
  {
    path: "login",
    //component: LoginComponent
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },

  {
    path: "main",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(m => m.DashboardModule)
        //canActivate: [AuthGuard]
      },

      {
        path: "evaluacion",
        // canActivate: [AdminGuard],
        component: EvaluacionComponent
      },
      {
        path: "preguntas",
        // canActivate: [AdminGuard],
        component: PreguntasComponent
      }
    ]
  },

  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }