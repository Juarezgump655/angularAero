import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-lista-aeropuerto',
  templateUrl: './lista-aeropuerto.component.html',
  styleUrls: ['./lista-aeropuerto.component.css']
})
export class ListaAeropuertoComponent implements OnInit {
  Aeropuertos:Aeropuertos[];
  aeropuerto: Aeropuertos;
  formulariobeta = new FormGroup({
    numeroAeropuerto: new FormControl(),
    nombre: new FormControl(),
    direccion: new FormControl()
  });
  constructor(private route:ActivatedRoute ,private aeropuertoservicio:AeropuertosService, private router:Router) { }
 id:number;
 ida:number;
 nombre: string;
 direccion: string;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.obtenerAerpuerto(); 
  }

  irPantalla(){
    this.router.navigate(['Pantalla-administrador', this.id])
  }
  crearAeropuerto(){
    this.router.navigate(['Crear-aeropuerto', this.id])
  }

  private obtenerAerpuerto(){
    this.aeropuertoservicio.obtenerListaDeAeropuerto().subscribe(dato =>{
      this.Aeropuertos = dato;
    });
  }

  Prueba(){
    this.ida =this.formulariobeta.get("numeroAeropuerto")?.value;
    this.nombre= this.formulariobeta.get("nombre")?.value;
    this.direccion= this.formulariobeta.get("direccion")?.value;
    
    console.log(this.ida, this.nombre, this.direccion)
    if(this.ida !=  null  || this.nombre!= null  || this.direccion != null){
      if(this.ida != null){
        this.aeropuertoservicio.obtenerfiltroid(this.formulariobeta.get("numeroAeropuerto")?.value).subscribe(dato =>{
          this.Aeropuertos=dato;
          if(dato == null){
            swal('ERROR', `No se ha encotrado el ID`, `error`)
          }
        },error =>  swal('ERROR', `No se ha encotrado el ID`, `error`)); 
      } else if(this.nombre != null && this.direccion != null){
        this.aeropuertoservicio.obtenerfiltro(this.nombre,this.direccion).subscribe(dato =>{
          this.Aeropuertos=dato;
          if(dato == null){
            swal('ERROR', `La consulta no devolvio nada`, `error`)
          }
        }, error => swal('ERROR', `Debe de llenar Los campos de nombre y direccion`, `error`));
      }  
    } else {
      swal('ERROR', `Rellene los campos`, `error`)
    }
    
  }

  actualizarAerpuerto(id:number){
    this.router.navigate(['actualizar-Aeropuerto', this.id, id])
  
  }

  verDetalles(id:number){
    this.router.navigate(['detalle-Aeropuerto/', id])
  }

  eliminarAeropuerto(id:number){
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
        this.eliminarAeropuertologico(id)
        this.obtenerAerpuerto;
          swal(
            'Aeropuerto eliminado',
            'El Aeropuerto ha sido eliminado con exito',
            'success'
          )  
      }
    })
  }



  eliminarAeropuertologico(idelim:number){
   console.log(idelim)
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
    this.aeropuertoservicio.obtenerAeropuertoPorId(idelim).subscribe(dato => {
      this.aeropuerto= dato;
      const aeropuerto: Aeropuertos ={
        idaeropuerto:this.aeropuerto.idaeropuerto,
        nombreaeropuerto: this.aeropuerto.nombreaeropuerto,
        nopuertas:this.aeropuerto.nopuertas,
        direccion:this.aeropuerto.direccion,
        pais:this.aeropuerto.pais,
        notelefono: this.aeropuerto.notelefono,
        idestado: 2,
        fechacreacion: this.aeropuerto.fechacreacion,
        fechamodicar: desdeStr,
        idusuariocreacion: this.aeropuerto.idusuariocreacion,
        usuarioModi:this.id,
      }
      this.aeropuertoservicio.actualizarAeropuerto(this.id, idelim, aeropuerto).toPromise().then(dato => {
      this.ngOnInit();
      }, error => swal('ERROR', `Hubo problemas al modificar el Aeropuerto, Porfavor intenta de nuevo`, `error`))
    }, error => console.log(error))

 
  }

}
