import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea, listaAerolineas } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-lista-aerolineas',
  templateUrl: './lista-aerolineas.component.html',
  styleUrls: ['./lista-aerolineas.component.css']
})
export class ListaAerolineasComponent implements OnInit {
  Aerolinea: Aerolinea[];
  listaAerolineas: listaAerolineas[];
  listaAeropuertos: listaAeropuertos[];
  idaerolinea: number;
  nombre: string;
  aerolinea: Aerolinea;
  idaeropuerto: number;
  formulariobeta = new FormGroup({
    numeroAerolinea: new FormControl(),
    Nombre: new FormControl(),
    Aeropuerto: new FormControl()
  });
  constructor(private aeropuertoService: AeropuertosService, private aerolineaservicio: AerolineaService, private router: Router, private route: ActivatedRoute) { }
  id: number;
  ngOnInit(): void {
    this.obtenerAerolinea();
    this.id = this.route.snapshot.params['id']
    this.aeropuertoService.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos = dato1;
      if (this.listaAeropuertos.length == 0) {
        swal('ERROR', `Debe crear un aeropuerto primero, Porfavor intenta de nuevo`, `error`)
        this.router.navigate(['/Pantalla-administrador', this.id])
      }
    });
  }

  private obtenerAerolinea() {
    this.aerolineaservicio.obtenerListaDeAerolineas().subscribe(dato => {
      this.listaAerolineas = dato;
      console.log(dato);
    });
  }

  Prueba() {
    this.idaerolinea = this.formulariobeta.get("numeroAerolinea")?.value;
    this.nombre = this.formulariobeta.get("Nombre")?.value;
    this.idaeropuerto = this.formulariobeta.get("Aeropuerto")?.value;


    if (this.idaerolinea != null || this.nombre != null || this.idaeropuerto != null) {
      if (this.idaerolinea != null) {
        this.aerolineaservicio.obtenerAerolineaid(this.formulariobeta.get("numeroAerolinea")?.value).subscribe(dato => {
          this.listaAerolineas = dato;
        }, error => swal('ERROR', `No se ha encotrado el ID`, `error`));
      } else if (this.nombre != null && this.idaeropuerto != null) {
        this.aerolineaservicio.obtenerAerolineafiltro(this.nombre, this.idaeropuerto).subscribe(dato => {
          this.listaAerolineas = dato;
        }, error => swal('ERROR', `Debe de llenar Los campos de Nombre y Aeropuerto`, `error`));
      } else {
        swal('ERROR', `Debe de llenar Los campos de Nombre y Aeropuerto`, `error`);
      }

    } else {
      swal('ERROR', `Rellene los campos`, `error`)
    }
  }

  irPantalla() {
    this.router.navigate(['Pantalla-administrador', this.id])
  }
  crearUsuario() {
    this.router.navigate(['Crear-aerolinea', this.id])
  }

  actualizarAerolinea(id: number) {
    this.router.navigate(['actualizar-Aerolinea', this.id, id])
  }

  verDetalles(id: number) {
    this.router.navigate(['detalle-aerolinea', id])
  }

  eliminarAeropuerto(id: number) {
    swal({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el usuario",
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
       this.eliminarAerolinealogico(id)
          swal(
            'Aeropuerto eliminado',
            'El Aeropuerto ha sido eliminado con exito',
            'success'
          )
      }
    })
  }

  eliminarAerolinealogico(idelim: number) {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    this.aerolineaservicio.obtenerAerolineaPorId(idelim).subscribe(dato => {
      this.aerolinea = dato;
      const aerolinea: Aerolinea = {
        idaerolineas: this.aerolinea.idaerolineas,
        nombreaerolinea: this.aerolinea.nombreaerolinea,
        correo: this.aerolinea.correo,
        codigopais: this.aerolinea.codigopais,
        numerotelefono: this.aerolinea.numerotelefono,
        idestado: 2,
        idusuariocreacion: this.aerolinea.idusuariocreacion,
        vuelos: this.aerolinea.vuelos,
        aviones: this.aerolinea.aviones,
        idaeropuerto: this.aerolinea.idaeropuerto,
        fechacreacion: this.aerolinea.fechacreacion,
        fechamodicar: desdeStr,
        usuariomodi: this.id,
      }
      this.aerolineaservicio.actualizarAerolinea(this.id, idelim, aerolinea).toPromise().then(dato => {
        this.ngOnInit();
      }, error => swal('ERROR', `Hubo problemas al modificar el Aeropuerto, Porfavor intenta de nuevo`, `error`))


    }, error => console.log(error))




  }


}
