import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
id:number;
  formulariobeta = new FormGroup({
    numeroPasaporte: new FormControl(),
    NombreCliente: new FormControl(),
    apellidos: new FormControl(),
    fecha: new FormControl(),
    nacionalidad: new FormControl(),
    correo: new FormControl(),
    codigopais: new FormControl(),
    numeroTelefono: new FormControl(),
    numeroTelefonoEm: new FormControl(),
    direccion: new FormControl(),
    contrasenia: new FormControl()

  });
  usuario: Usuario = new Usuario();
  constructor(private route:ActivatedRoute,private usuarioServicio: UsuarioService, private router: Router) { }
  iduser:number;
  aparecer:boolean =false;

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['id'];
    if(this.iduser != undefined){
      this.aparecer = true
    }
  }

  guardarUsuario(user?: Usuario) {
    console.log(user!);
    this.usuarioServicio.registrarUsuario(user!).toPromise().then(dato => {
      console.log(dato);
      swal(
        'Usuario Creado',
        'El usuario ha sido creado con exito',
        'success'
      )
      this.enviarInicioSesion();
    }, error => swal('ERROR', `Error al crear el Usuario intente de nuevo `, `error`));
  }

  enviarInicioSesion() {
    if(this.iduser != undefined){
      this.router.navigate(["/iniciar-sesion", this.iduser])
    }else{
      this.router.navigate(["/iniciar-sesion"])
    }
  
  }

  verificarPasaporte(id:number){
    this.usuarioServicio.obtenerporNumerop(this.id).subscribe(dato =>{
      if(dato != null){
        swal('ERROR', `El Numero de pasaporte ya tiene cuenta `, `error`);
      }          
    })
  }

  Home(){
    this.router.navigate(['/home']);
  }
  irSesion(){
    this.router.navigate(['/iniciar-sesion', this.iduser]);
  }
  Prueba(): void {
    this.id= this.formulariobeta.get("numeroPasaporte")?.value
    this.verificarPasaporte(this.id);
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

   
    const user: Usuario = {
      idusuario: 0,
      numeroPasaporte: this.formulariobeta.get("numeroPasaporte")?.value,
      nombreCliente: this.formulariobeta.get("NombreCliente")?.value,
      apellidocliente: this.formulariobeta.get("apellidos")?.value,
      fechanacimiento: this.formulariobeta.get("fecha")?.value,
      nacionalidad: this.formulariobeta.get("nacionalidad")?.value,
      correo: this.formulariobeta.get("correo")?.value,
      codigopais: this.formulariobeta.get("codigopais")?.value,
      numerotelefoono: this.formulariobeta.get("numeroTelefono")?.value,
      numerotelefoonoem: this.formulariobeta.get("numeroTelefonoEm")?.value,
      direccion: this.formulariobeta.get("direccion")?.value,
      contrasenia: this.formulariobeta.get("contrasenia")?.value,
      idroles: 4,
      idestado: 1,
      fechacreacion: desdeStr,
      fechamodicar:desdeStr,

    }
 
    swal({
      title: '¿Estas seguro?',
      text: "¿Está seguro de continuar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , estoy seguro',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.guardarUsuario(user);
       
      }
    })
  }


}
