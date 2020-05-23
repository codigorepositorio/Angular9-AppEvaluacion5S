import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
/**
 * menu data service
 */
export class MenuDataService {
    getMenuList() {
        return [
          {
            Label: "Inicio",
            Icon: "fa-home",
            RouterLink: "/main/dashboard",
            Childs: null,
            IsChildVisible: false
          },
          {
            Label: "Medición",
            Icon: "fa-file-alt",
            RouterLink: "/main/evaluacion",
            Childs: null,
            IsChildVisible: false
          },
          {
            Label: "Resultados 5S",
            Icon: "fa-clipboard-list",
            RouterLink: null,
            Childs: null,
            IsChildVisible: false
          },
        
          {
            Label: "Ajustes",
            Icon: "fa-hands-helping",
            RouterLink: "/main/preguntas",
            Childs: null,
            IsChildVisible: false
          }
        ];
    }
}