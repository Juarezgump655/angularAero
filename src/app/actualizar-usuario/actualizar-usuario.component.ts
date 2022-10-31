import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  
  formulariobeta = new FormGroup({
    numeroPasaporte: new FormControl({value: '', disabled: true}, Validators.required),
    NombreCliente: new FormControl(),
    fecha: new FormControl(),
    nacionalidad: new FormControl(),
    correo: new FormControl(),
    codigopais: new FormControl(),
    numeroTelefono: new FormControl(),
    numeroTelefonoEm: new FormControl(),
    direccion: new FormControl(),
    contrasenia: new FormControl()

  });

  id: number;

  usuario: Usuario = new Usuario(); 
  constructor(private usarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usarioService.obtenerUsuarioPorId(this.id).subscribe(dato => {
      this.usuario = dato;
    }, error => console.log(error));
  }

  irListaUsuarios() {
    this.router.navigate(['/Usuarios']);
    swal('Usuario actualizado', `El usuario ${this.usuario.nombreCliente} ha sido actualizado con exito`, `success`);
  }



  onSubmit() {
   
    const user: Usuario = {
      idusuario: 2,
      numeroPasaporte:this.usuario.numeroPasaporte,
      nombreCliente: this.formulariobeta.get("NombreCliente")?.value??this.usuario.nombreCliente,
      apellidocliente: "",
      fechanacimiento: this.formulariobeta.get("fecha")?.value??this.usuario.fechanacimiento,
      nacionalidad: this.formulariobeta.get("nacionalidad")?.value??this.usuario.nacionalidad,
      correo: this.formulariobeta.get("correo")?.value??this.usuario.correo,
      codigopais: this.formulariobeta.get("codigopais")?.value??this.usuario.codigopais,
      numerotelefoono: this.formulariobeta.get("numeroTelefono")?.value??this.usuario.numerotelefoono,
      numerotelefoonoem: this.formulariobeta.get("numeroTelefonoEm")?.value??this.usuario.numerotelefoonoem,
      direccion: this.formulariobeta.get("direccion")?.value??this.usuario.direccion ,
      contrasenia:this.formulariobeta.get("contrasenia")?.value??this.usuario.contrasenia,
      idroles: 4,
      idestado: 1,
      fechacreacion: "",
      fechamodicar:" ",

    }

    console.log(this.id);
    this.usarioService.actualizarUsuario(this.id, user).toPromise().then(dato => {
      this.irListaUsuarios();
    }, error => console.log(error))
  }


}
