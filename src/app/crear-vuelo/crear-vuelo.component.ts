import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AerolineaService } from '../aerolinea.service';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Avion } from '../avion';
import { AvionService } from '../avion.service';
import { Puerta, Puertas } from '../puerta';
import { PuertaService } from '../puerta.service';
import { Tripulacion, tripulaciontable } from '../tripulacion';
import { TripulacionService } from '../tripulacion.service';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';
import { Vuelo } from '../vuelo';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  usuarioInterno: Usuariosinternos;
  idaerolinea: number;
  idAeropuerto: number;
  listaAviones: Avion[];
  Aeropuertos: Aeropuertos[];
  puertas: Puertas[];
  tripulacion: tripulaciontable[];
  shouldRun = true;
  idtripu: number;
  idAvion: number;
  mobileQuery: MediaQueryList;
  idAropuertoll: number;

  private _mobileQueryListener: () => void;
  constructor(private vueloServicio:VueloService,private tripulacionServicio: TripulacionService, private puertaServicio: PuertaService, private AeropuertoServicio: AeropuertosService, private avionServicio: AvionService, private UsuarioInternoservicio: UsuariosinternosService, private aerolineaServicio: AerolineaService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: ActivatedRoute, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  formulariobeta = new FormGroup({
    Fechasalida: new FormControl(),
    Fechallegada: new FormControl(),
    horasalida: new FormControl(),
    horaentrada: new FormControl(),
    precioEconomica: new FormControl(),
    claseEjecutiva: new FormControl(),
    puertaAbordaje: new FormControl(),
    noPuerta: new FormControl(),
  });

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
  id: number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.traeridAero();
  }

  seleccionar(id: number) {
    this.router.navigate(['/consultas-aerolinea', this.id, id]);
  }

  traerAeropuerto(id: number) {
    this.AeropuertoServicio.traerAeropuertoConsu(id).subscribe(dato => {
      this.Aeropuertos = dato;
    })
  }

  traerListaPuertas(id: number) {
    this.puertaServicio.obtenerPuertas(id).subscribe(dato => {
      this.puertas = dato;
    })
  }

  seleccionarTripu(id: number) {
    this.idtripu = id;
    swal('Ha seleccionado una tripulacion', `Ha selecciona la tripulacion con id: ` + id, `success`)

  }

  seleccionarAvion(id: number) {
    this.idAvion = id
    swal('Ha seleccionado un Avion', `Ha selecciona el Avion con id: ` + id, `success`)
  }

  SeleccionarA(id: number) {
    this.idAropuertoll= id
    swal('Ha seleccionado un Aeropuerto', `Ha selecciona el Aeropuerto con id: ` + id, `success`)
  }

  onSubmit() {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    this.UsuarioInternoservicio.obtenerUsuariosinternosPorId(this.id).subscribe(dato => {
      this.usuarioInterno = dato
      const vuelo: Vuelo = {
        idvuelo: 0,
        idaeropuerto: this.usuarioInterno.idaeropuerto,
        idestino: this.idAropuertoll,
        idaerolinea: this.usuarioInterno.idaerolinea,
        idestado: 1,
        idavion: this.idAvion,
        precioeconomico: this.formulariobeta.get("precioEconomica")?.value,
        precioejecutivo: this.formulariobeta.get("claseEjecutiva")?.value,
        puertabordaje: this.formulariobeta.get("noPuerta")?.value,
        fechasalida: this.formulariobeta.get("Fechasalida")?.value,
        fechallegada: this.formulariobeta.get("Fechallegada")?.value,
        fechacreacion: desdeStr,
        fechamodicar: desdeStr,
        idusuariocreacion: this.id,
        idestadovuelo: 1,
        id_tripu: this.idtripu,
        horasalida: this.formulariobeta.get("horasalida")?.value,
        horallegada: this.formulariobeta.get("horaentrada")?.value,
      }
    
      console.log(vuelo);
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
          this.crearVuelo(vuelo);
          swal(
            'Vuelo Creado',
            'La vuelo ha sido creada con exito',
            'success'
          )

        }
      })


    })


    

  }

  crearVuelo(vuelo? : Vuelo){
    console.log(vuelo)
  this.vueloServicio.registrarVuelo(vuelo!).toPromise().then(dato =>{
    this.cambiarEstado(this.idAvion)
      this.router.navigate(['/pantalla-principal', this.id]);

    }, error => swal('ERROR', `Hubo problemas al crear el vuelo, Porfavor intenta de nuevo`, `error`)) 

  }

  traeridAero() {
    this.UsuarioInternoservicio.obtenerUsuariosinternosPorId(this.id).subscribe(dato => {
      this.usuarioInterno = dato
      this.idaerolinea = this.usuarioInterno.idaerolinea;
      this.idAeropuerto = this.usuarioInterno.idaeropuerto;
      this.traerAeropuerto(this.idAeropuerto);
      this.validarAviones(this.idaerolinea);
      this.traerListaPuertas(this.idAeropuerto);
      this.traertripu(this.idAeropuerto);

    })
  }

  validarAviones(id: number) {
    this.avionServicio.obtenerAvionAerolineac(this.id, id).subscribe(dato => {
      this.listaAviones = dato;
      if (this.listaAviones.length == 0) {
        swal('ERROR', `No se puede crear un vuelo porque la aerolínea no cuenta con aviones disponibles`, `error`)
        this.router.navigate(['/pantalla-principal', this.id]);

      }
    }, error => swal('ERROR', `Hubo problemas para traer los aviones`, `error`))
  }

  traertripu(id: number) {
    this.tripulacionServicio.traerTable(id).subscribe(dato => {
      this.tripulacion = dato
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



 cambiarEstado(id: number){
  let fecha = new Date();
  let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
  this.avionServicio.obtenerAvionId(id).subscribe(dato =>{
    const avion : Avion={
      idavion:  dato.idavion,
      marca: dato.marca,
      modelo: dato.modelo,
      vuelos: dato.vuelos,
      idestado: 3,
      idaerolinea: dato.idaerolinea,
      fechacreacion: dato.fechacreacion,
      fechamodicar: desdeStr,
      idusuariocreacion: dato.idusuariocreacion,
      idaeropuerto: dato.idaeropuerto,
      usuariomodi: this.id,
      anio: dato.anio,
      asientos: dato.asientos
    }
    this.avionServicio.actualizarAvion(this.id, id, avion).subscribe(dato => {
      console.log(dato); 
      this.ngOnInit();
    }, error => swal('ERROR', `El avion no puede ser eliminado, consulte con administracion`, `error`))
  })

 }


}
