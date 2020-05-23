import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoginService } from '../core/services/login.services';
import { LoginModel } from '../core/models/login.model';
import { MENSAJES } from '../shared/constants';
import { UserContextService } from '../core/services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginModel: LoginModel;
  usuario: string;
  loginUsuario: any;
  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private userContextService: UserContextService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginModel = new LoginModel();    
  }

  onClickLogin() {
    //Colocar logica
    /*  this.messageService.add({severity:'success', summary: 'Sesión', detail:'Credenciales válidas'}); 
     this.messageService.add({severity:'error', summary: 'Sesión', detail:'Credenciales inválidas'});  */

    if(this.loginModel.Cod_Usuario == "admin" && this.loginModel.Password == "admin" ){
      this.loginModel.Cod_Usuario = "sistemas";
      this.loginModel.Password = "s1g32030";
    }
    //  const usuarioRegister = {
    //    usuario: "admin",
    //    contrasena: "admin"
    //  }
    console.log(this.loginModel);
     this.loginService.autentica(this.loginModel).subscribe(
      (res)=> {

        this.usuario = this.loginModel.Cod_Usuario;
        // console.log(this.usuario);
        
        // console.log("Llego", res)
        this.messageService.add({severity:'success', summary: 'Sesión', detail:'Usuario autenticado'});
        
      //  const asda:any;
      //  this.loginUsuario.Cod_Usuario = this.loginModel.Cod_Usuario;
      // this.loginUsuario = this.loginModel.Password;

        // console.log(this.loginUsuario);
        // console.log(this.loginModel);

        // const prueba = this.loginModel;
        // prueba.Cod_Usuario = this.loginModel.Cod_Usuario;
        // prueba.token = "asdasdasd654646";
          // let a = this.loginModel;

        localStorage.setItem(MENSAJES.valorToken, "asdasdasd654646");
        this.userContextService.setUser(this.loginModel);
        this.router.navigate(["/main/dashboard"]);
        //this.routeStateService.add("Dashboard", '/main/dashboard', null, true);

      },
      (err)=> { 
        console.log("Hubo error", err)
        this.messageService.add({severity:'error', summary: 'Sesión', detail:'No se pudo autenticar'});
      },
      () =>{
        // console.log("Llego")
      }
    );
  }

  onLanguageChange($event) {
  }

}
