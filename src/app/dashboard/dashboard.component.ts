import { Component, OnInit } from '@angular/core';
import { SessionService } from '../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  barChartData: any;

  doughnutChartData: any;

  msgs: any[];
  user: any;
  constructor(private sessionService: SessionService, private router: Router) {
    this.barChartData = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
      datasets: [
        {
          label: "Rechazado",
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Aprovado",
          backgroundColor: "#9CCC65",
          borderColor: "#7CB342",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.doughnutChartData = {
      labels: ["Activo", "Inactivo", "Eliminado"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    this.msgs = [];
    this.msgs.push({
      severity: "success",
      summary: "",
      detail: "Bienvenido al Portal de la Co."
    });
    /*       translate.get("WelcomeMessage").subscribe((text: string) => {
        
      }); */
  }

  ngOnInit() {
    // this.user = this.sessionService.getItem("currentUser");
    // if (this.user == null) {
    //   this.router.navigate(["login"]);
    // }
  }
}