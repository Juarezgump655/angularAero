import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea, listaAerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { tablaRoles, tablaUsuarios, Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-lista-usuarios-internos',
  templateUrl: './lista-usuarios-internos.component.html',
  styleUrls: ['./lista-usuarios-internos.component.css']
})
export class ListaUsuariosInternosComponent implements OnInit {
  estadoSesion: number;
  tablaRoles: tablaRoles[];
  tablaUsuarios: tablaUsuarios[];
  listaAerolineas: listaAerolinea[];
  nombre: string;
  idaerolinea:number;
  idaeropuerto: number;
id:number;
usuarioInterno : Usuariosinternos;
listaAeropuertos: listaAeropuertos[];
  formulariobeta = new FormGroup({
    nombre: new FormControl(),
    idaerolinea: new FormControl(),
    idaeropuerto: new FormControl()
  });
  constructor(private aerolineaServicio:AerolineaService,private aeropuertoService:AeropuertosService,  private route:ActivatedRoute,private usuariosinternosservicio: UsuariosinternosService, private router: Router) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerUsuarios();
    this.aeropuertoService.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos=dato1;
      if(this.listaAeropuertos== null){
        swal('ERROR', `Debe crear un aeropuerto primero, Porfavor intenta de nuevo`, `error`)
        this.router.navigate(['/Pantalla-administrador', this.id])
      } });
      this.aerolineaServicio.obtenerAerolineas().subscribe(dato2 =>{
        this.listaAerolineas=dato2
        if(this.listaAerolineas==null){
          swal('ERROR', `Debe crear una Aerolinea primero, Porfavor intenta de nuevo`, `error`)
          this.router.navigate(['/Pantalla-administrador', this.id])
        }
      });

  }
  Home() {
    this.router.navigate(['/home']);
  }
  private obtenerUsuarios() {
    this.usuariosinternosservicio.obtenerListaDeUsuariosinternos().subscribe(dato => {
      this.tablaUsuarios = dato;
      console.log(dato);
    });
  }

  crearUsuario(){
    this.router.navigate(['crear-usuario', this.id])
  }

  actualizarUsuario(id: number) {
    this.router.navigate(['actulizar-usuario-interno',this.id, id]);
    
  }

  verDetalles(id: number) {
    this.router.navigate(['detalle-Usuario', id]);
  }

  Prueba() {
    this.nombre = this.formulariobeta.get("nombre")?.value;
    this.idaerolinea = this.formulariobeta.get("idaerolinea")?.value;
    this.idaeropuerto = this.formulariobeta.get("idaeropuerto")?.value;

    if (this.nombre != null || this.idaerolinea != null || this.idaeropuerto != null) {
        this.usuariosinternosservicio.obtenerUsuariosFiltro(this.nombre, this.idaeropuerto, this.idaerolinea).subscribe(dato => {
          this.tablaUsuarios = dato;
        }, error => swal('ERROR', `La consulta no devolvio nada`, `error`));
    }else {
      swal('ERROR', `Rellene los campos`, `error`)
    }

  }
  irPantalla(){
    this.router.navigate(['Pantalla-administrador', this.id])
  }

  eliminarUsuario(id: number) {
    swal({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar al usuario",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
       this.eliminarusuariologico(id)
          this.obtenerUsuarios();
          swal(
            'Usuario eliminado',
            'El usuario ha sido eliminado con exito',
            'success'
          )  
      }
    })
  }

  eliminarusuariologico(idelim:number){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
    this.usuariosinternosservicio.obtenerUsuariosinternosPorId(idelim).subscribe(dato =>{
      this.usuarioInterno = dato

      const user: Usuariosinternos = {
        idusuariointerno: this.usuarioInterno.idusuariointerno,
        documentoidentificaion: this.usuarioInterno.documentoidentificaion,
        nombres: this.usuarioInterno.nombres,
        apellidos:this.usuarioInterno.apellidos,
        fechanacimiento: this.usuarioInterno.fechanacimiento,
        nacionalidad:this.usuarioInterno.nacionalidad,
        correo:this.usuarioInterno.correo,
        codigopais: this.usuarioInterno.codigopais,
        numerotelefoono:this.usuarioInterno.numerotelefoono,
        numerotelefoonoem: this.usuarioInterno.numerotelefoonoem,
        direccion: this.usuarioInterno.direccion,
        contrasenia:this.usuarioInterno.contrasenia,
        idestado: 2,
        usariocreacion: this.usuarioInterno.usariocreacion,
        fechacreacion:this.usuarioInterno.fechacreacion,
        fechamodicar: desdeStr,
        idaeropuerto:this.usuarioInterno.idaeropuerto,
        idaerolinea: this.usuarioInterno.idaerolinea,
        idroles: this.usuarioInterno.idroles,
        usuariomodi: this.id,
  
      }
      this.usuariosinternosservicio.actualizarUsuariosinternos( this.id , idelim, user).toPromise().then(dato => {

        this.ngOnInit();
      }, error => swal('ERROR', `Hubo problemas al modificar el Usuario, Porfavor intenta de nuevo`, `error`) )
  
    
    })


  }



}
