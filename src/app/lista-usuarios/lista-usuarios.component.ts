import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  Usuarios:Usuario[];


  constructor(private usuarioServicio:UsuarioService, private router:Router ) { }

  ngOnInit(): void {
   this.obtenerUsuarios(); 

  }

  actualizarUsuario(id:number){
    this.router.navigate(['actualizar-usuario', id])
  }

  eliminarUsuario(id:number){
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
      if(result.value){
        this.usuarioServicio.eliminarUsuario(id).subscribe(dato => {
          console.log(dato);
          this.obtenerUsuarios();
          swal(
            'Usuario eliminado',
            'El usuario ha sido eliminado con exito',
            'success'
          )
        })
      }
    })
  }
  
  verDetalles(id:number){
    this.router.navigate(['usuario-detalle', id])
  }

 //llama a un servicio que esta vinculado con una ruta
   private obtenerUsuarios(){
    this.usuarioServicio.obtenerListaDeEmpleados().subscribe(dato =>{
      this.Usuarios = dato;
      console.log(dato);
    });

   }
}
