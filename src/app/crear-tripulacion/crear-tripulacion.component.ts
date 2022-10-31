import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconOptions } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { Tripulacion } from '../tripulacion';
import { TripulacionService } from '../tripulacion.service';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-crear-tripulacion',
  templateUrl: './crear-tripulacion.component.html',
  styleUrls: ['./crear-tripulacion.component.css']
})
export class CrearTripulacionComponent implements OnInit {
  formulariobeta = new FormGroup({
    idpiloto: new FormControl(),
    idcopiloto: new FormControl(),
    idingeniero: new FormControl(),
    idtripulantes1: new FormControl(),
    idtripulantes2: new FormControl(),
    idtripulantes3: new FormControl(),
    fechacreacion: new FormControl(),
    fechamodicar: new FormControl(),
  });


  pilotos: Usuariosinternos[];
  Copilotos: Usuariosinternos[];
  Inges: Usuariosinternos[];
  Tripulantes: Usuariosinternos[];
  idavion: string;

  id: number;
  usuarioCreacion: Usuariosinternos = new Usuariosinternos();
  idaero: number;
  idp: number;
  piloto: Usuariosinternos;
  copilo: Usuariosinternos;
  Inge: Usuariosinternos;
  tripu1: Usuariosinternos;
  tripu2: Usuariosinternos;
  tripu3: Usuariosinternos;
  mobileQuery: MediaQueryList;
  aerolinea: Aerolinea;
  nombreAerolinea: string;

  fillerNav = [
    { name: "HOME", icon: "home" },
    { name: "------------CONSULTAS------------", icon: "", },
    { name: "PASAJEROS POR VUELO", icon: "group" },
    { name: "EQUIPAJE POR VUELO", icon: "work_outline" },
    { name: "VUELOS", icon: "flight_takeoff" },
    { name: "AEROLINEAS", icon: "search" },
    { name: "AVIONES", icon: "flight" },
    { name: "DESTINOS", icon: "location_on" },
    { name: "------------AEROLINEA------------", icon: "" },
    { name: "CREAR TRIPULACION", icon: "group_add" },
    { name: "CREAR AVION", icon: "add_circle" },
    { name: "AGREGAR VUELO", icon: "add" },
  ]


  private _mobileQueryListener: () => void;
  constructor(private aerolineaServicio: AerolineaService, private usuariosInternosServices: UsuariosinternosService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private tripulacionservicio: TripulacionService, private router: Router, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  shouldRun = true;
  ngOnInit(): void {
    this.nombreAerolinea = "";
    this.id = this.route.snapshot.params['id'];
    this.obtenerUsuario()

    this.usuariosInternosServices.obtenerUsuariosinternosPorId(this.id).subscribe(dato3 => {
      this.usuarioCreacion = dato3
      this.idaero = this.usuarioCreacion.idaerolinea;
      this.idp = this.usuarioCreacion.idaeropuerto;
      this.aerolineaServicio.obtenerAerolineaPorId(this.usuarioCreacion.idaerolinea).subscribe(dato => {
        this.aerolinea = dato;
        this.nombreAerolinea = this.aerolinea.nombreaerolinea;
      })
      this.obtenerListas();
    })
  }

  obtenerListas() {

    //Pilotos
    this.usuariosInternosServices.obtenerListaPilotos(this.idaero, this.idp).subscribe(dato => {
      this.pilotos = dato;
      console.log(this.pilotos);
      if (this.pilotos.length == 0) {
        swal('ERROR', `No hay pilotos disponibles consulte con administracion`, `error`)
      }
    }, error => swal('ERROR', `No hay pilotos disponibles, Porfavor consulte con administracion`, `error`));

    //copilotos
    this.usuariosInternosServices.obtenerListaCoPilotos(this.idaero, this.idp).subscribe(dato2 => {
      this.Copilotos = dato2;
      console.log(this.Copilotos);
      if (this.Copilotos.length == 0) {
        swal('ERROR', `No hay Copilotos disponibles, Porfavor consulte con administracion`, `error`)
      }
    }, error => swal('ERROR', `No hay Copilotos disponibles, Porfavor consulte con administracion`, `error`));

    //inges
    this.usuariosInternosServices.obtenerListaInges(this.idaero, this.idp).subscribe(dato2 => {
      this.Inges = dato2;
      if (this.Inges.length == 0) {
        swal('ERROR', `No hay Inges disponibles, Porfavor consulte con administracion`, `error`)
      }
    }, error => swal('ERROR', `No hay Inges disponibles, Porfavor consulte con administracion`, `error`));

    //tripulantes
    this.usuariosInternosServices.obtenerListaTripulantes(this.idaero, this.idp).subscribe(dato2 => {
      this.Tripulantes = dato2;
      if (this.Tripulantes.length == 0) {
        swal('ERROR', `No hay Tripulantes disponibles, Porfavor consulte con administracion`, `error`)
      }
    }, error => swal('ERROR', `No hay Tripulantes disponibles, Porfavor consulte con administracion`, `error`));



  }

  prueba() {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    const tripu: Tripulacion = {
      idtripulacion: 0,
      idaeropuerto: this.usuarioCreacion.idaeropuerto,
      idpiloto: this.piloto.idusuariointerno,
      idcopiloto: this.copilo.idusuariointerno,
      idingeniero: this.Inge.idusuariointerno,
      idtripulantes1: this.tripu1.idusuariointerno,
      idtripulantes2: this.tripu2.idusuariointerno,
      idtripulantes3: this.tripu3.idusuariointerno,
      idaerolinea: this.usuarioCreacion.idaerolinea,
      idestado: 1,
      idusuariocreacion: this.id,
      fechacreacion: desdeStr,
      fechamodicar: desdeStr,
      idavion: this.idavion
    }
    console.log(tripu)
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
        this.guardartripulacion(tripu);
        swal(
          'Tripulacion Creado',
          'La tripúlacion ha sido creada con exito',
          'success'
        )
      this.router.navigate(['/pantalla-principal', this.id]);
      }
    })
  }

  guardartripulacion(tripulacion?: Tripulacion) {
    this.tripulacionservicio.registrarTripulacion(this.id, tripulacion!).toPromise().then(dato => {
    }, error => swal('ERROR', `Hubo problemas al crear la tripulacion, Porfavor intenta de nuevo`, `error`))
  }


  obtenerUsuario() {
    this.usuariosInternosServices.obtenerUsuariosinternosPorId(this.id).subscribe(dato => {
      this.usuarioCreacion = dato;

      console.log(this.usuarioCreacion)
    })
  }


  seleccionarPiloto(id: number) {
    this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
      this.piloto = dato
      swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
      console.log(this.piloto)
    })
  }

  seleccionarInge(id: number) {
    this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
      this.Inge = dato
      swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
      console.log(this.Inge)
    })
  }

  seleccionarCopiloto(id: number) {
    this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
      this.copilo = dato
      swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
      console.log(this.copilo)
    })
  }


  irMenus(nombre: string) {
    console.log(nombre)
 switch (nombre) {
      case "HOME":
        this.router.navigate(['/pantalla-principal', this.id]);
        break;
      case "PASAJEROS POR VUELO":
        this.router.navigate(['/consultar-pasajeros',  this.id]);
        break;
      case "EQUIPAJE POR VUELO":
        this.router.navigate(['/consultar-equipaje-vuelo',  this.id]);
        break;
        case "VUELOS":
          this.router.navigate(['/consulta-vuelo',  this.id]);
          break;
        case "AEROLINEAS":
          this.router.navigate(['/consultas-aerolineas/aeropuertos', this.id]);
          break;
      case "AVIONES":
        this.router.navigate(['/consultas-aerolineas-aviones', this.id]);
        break;
      case "DESTINOS":
        this.router.navigate(['/consultas-Destinos', this.id]);
        break;
      case "CREAR TRIPULACION":
        this.router.navigate(['/crear-tripulacion', this.id]);
        break;
      case "CREAR AVION":
        this.router.navigate(['/crear-aviones', this.id]);
        break;
      case "AGREGAR VUELO":
        this.router.navigate(['/crear-vuelo', this.id]);
        break;
      default:
        break;
    }
  }



  seleccionartripulantes(id: number) {
    if (this.tripu1 == null) {
      this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
        this.tripu1 = dato
        swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
        console.log(this.tripu1)
      })
    } else if (this.tripu2 == null) {
      this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
        this.tripu2 = dato
        swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
        console.log(this.tripu2)
      })
    } else if (this.tripu3 == null) {
      this.usuariosInternosServices.obtenerUsuariosinternosPorId(id).subscribe(dato => {
        this.tripu3 = dato
        swal('Agregado', `El usuario se ha agreado a la tripulacion`, `success`)
        console.log(this.tripu3)
      })
    }


  }


  elimninartripulantes(id: number) {

  }



}
