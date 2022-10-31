import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { FormControl, FormGroup } from '@angular/forms'
import { Usuario } from '../usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  id!:string;
  NumeroPasaporte:number;
  usuario : Usuario;
  contrasenia:String;
  userid:number;
  idvuelo:number;
  constructor(private usuarioServicio: UsuarioService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idvuelo = this.route.snapshot.params['id'];
  }

  Home(){
    this.router.navigate(['/home']);
  }
  


  formulariobeta = new FormGroup({
    numeroPasaporte: new FormControl(),
    contrasenia: new FormControl()
  });

  
  iniciarSesion(NumeroPasaporte:number, contrasenia:String){
    if(NumeroPasaporte ==this.usuario.numeroPasaporte && contrasenia ==this.usuario.contrasenia){
      return true;
    }else{

      return false;

    }
  }

onSubmit() {
    this.id = this.formulariobeta.get("numeroPasaporte")?.value;
    this.contrasenia=this.formulariobeta.get("contrasenia")?.value;

 this.usuarioServicio.obtenerporNumerop(parseInt(this.id)).subscribe(dato =>{
    this.usuario=dato;
    if(this.usuario  == null){
      swal('ERROR', `Numero de pasaporte o contraseña no encontrados `, `error`)
    }else{
      this.userid =this.usuario.idusuario
      console.log(this.userid)
      if(this.iniciarSesion(parseInt(this.id), this.contrasenia )){
        swal('BIENVENIDO', `Bienvenido al sistema ${this.usuario.nombreCliente} `, `success`);
        if(this.idvuelo == undefined){
          this.router.navigate(['/consultar-vuelos',  this.userid]);
        } else{
          this.router.navigate(['/consultar-vuelos',this.idvuelo,  this.userid]);
        }

      }else{
        swal('ERROR', `Numero de pasaporte o contraseña no encontrados `, `error`); 
      }
    }
  },error=>{swal('ERROR', `Numero de pasaporte o contraseña no encontrados `, `error`);  })
  }


}
