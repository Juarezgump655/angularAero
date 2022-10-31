import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Administrador } from '../administrador';
import { AdministradorService } from '../administrador.service';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-iniciar-sesion-trabajo',
  templateUrl: './iniciar-sesion-trabajo.component.html',
  styleUrls: ['./iniciar-sesion-trabajo.component.css']
})
export class IniciarSesionTrabajoComponent implements OnInit {
  id: string;
  contrasenia: string;
  tipo: number;
  usuarioInterno: Usuariosinternos;
  administrador: Administrador;

  formulariobeta = new FormGroup({
    idusuario: new FormControl(),
    contrasenia: new FormControl(),
    tipo: new FormControl(),
  });
  constructor(private usuariosinternosservicio: UsuariosinternosService, private administradorservicio: AdministradorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  Home() {
    this.router.navigate(['/home']);
  }



  onSubmit() {
    
    this.tipo = this.formulariobeta.get("tipo")?.value;
    if(this.formulariobeta.get("tipo")?.value == null){
      this.tipo = 1;
    }
    this.id = this.formulariobeta.get("idusuario")?.value;
    this.contrasenia = this.formulariobeta.get("contrasenia")?.value;
        //si el usuario elige Administrador ejecutara un metodo que vaya a la entidad Administradores
    if (this.tipo == 1) {
      this.administradorservicio.obtenerAdministradorPorId(parseInt(this.id)).subscribe(dato => {
        this.administrador = dato;
        if (this.iniciarSesionAdmin(parseInt(this.id), this.contrasenia)) {
          swal('BIENVENIDO', `Bienvenido al sistema ${this.administrador.nombres} `, `success`);
          this.router.navigate(['/Pantalla-administrador', this.id]);
        } else {
          swal('ERROR', `Credenciales inválidas`, `error`);
        }
      }, error => { swal('ERROR', `Credenciales inválidas `, `error`); })
    }
    //si el usuario elige trabajador ejecutara un metodo que vaya a la entidad usuarios internos
    if (this.tipo == 2) {
      this.usuariosinternosservicio.iniciarSesionUsuariosinternos(parseInt(this.id)).subscribe(dato => {
        this.usuarioInterno = dato;
        if (this.iniciarSesiont(parseInt(this.id), this.contrasenia)) {
          swal('BIENVENIDO', `Bienvenido al sistema ${this.usuarioInterno.nombres} `, `success`);
          this.router.navigate(['/pantalla-principal', this.id]);
        }else {
          swal('ERROR', `Credenciales inválidas`, `error`);
        }
      }, error => { swal('ERROR', `Credenciales inválidas `, `error`); })
    }

  }
  //inicio sesion admins
  iniciarSesionAdmin(idAdmin: number, contrasenia: String) {
    if (idAdmin == this.administrador.idadminstrador && contrasenia == this.administrador.contrasenia) {
      return true;
    } else {
      return false;

    }
  }
  //inicio sesion usuariosInternos
  iniciarSesiont(idtrabajador: number, contrasenia: String) {
    if (idtrabajador == this.usuarioInterno.idusuariointerno && contrasenia == this.usuarioInterno.contrasenia) {
      return true;
    } else {
      return false;

    }
  }
}
