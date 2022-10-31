import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea, listaAerolineas } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-consultar-destinos-autorizados',
  templateUrl: './consultar-destinos-autorizados.component.html',
  styleUrls: ['./consultar-destinos-autorizados.component.css']
})
export class ConsultarDestinosAutorizadosComponent implements OnInit {
  shouldRun = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private route:ActivatedRoute ,private aerolineaServicio:AerolineaService,private aeropuertoService:AeropuertosService,private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  formulariobeta = new FormGroup({
    numeroAerolinea: new FormControl(),
    Nombre: new FormControl(),
    Aeropuerto: new FormControl()
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
  listaAerolineas: listaAerolineas[];
  listaAeropuertos: listaAeropuertos[];
  idaerolinea: number;
  nombre: string;
  aerolinea: Aerolinea;
  idaeropuerto: number;
  id:number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.obtenerAerolinea();
    this.obtenerAeropuertos();
  }

  Prueba() {
    this.idaerolinea = this.formulariobeta.get("numeroAerolinea")?.value;
    this.nombre = this.formulariobeta.get("Nombre")?.value;
    this.idaeropuerto = this.formulariobeta.get("Aeropuerto")?.value;


    if (this.idaerolinea != null || this.nombre != null || this.idaeropuerto != null) {
      if (this.idaerolinea != null) {
        this.aerolineaServicio.obtenerAerolineaid(this.formulariobeta.get("numeroAerolinea")?.value).subscribe(dato => {
          this.listaAerolineas = dato;
        }, error => swal('ERROR', `No se ha encotrado el ID`, `error`));
      } else if (this.nombre != null && this.idaeropuerto != null) {
        this.aerolineaServicio.obtenerAerolineafiltro(this.nombre, this.idaeropuerto).subscribe(dato => {
          this.listaAerolineas = dato;
        }, error => swal('ERROR', `Debe de llenar Los campos de Nombre y Aeropuerto`, `error`));
      } else {
        swal('ERROR', `Debe de llenar Los campos de Nombre y Aeropuerto`, `error`);
      }

    } else {
      swal('ERROR', `Rellene los campos`, `error`)
    }
  }

  seleccionar(id: number){
    this.aerolineaServicio.obtenerAerolineaPorId(id).subscribe(dato =>{
      this.aerolinea=dato;
      this.router.navigate(['/consultas-Destinos/aeropuertos',    this.id, this.aerolinea.idaeropuerto]);
    })
    
   
  }
  
  private obtenerAerolinea() {
    this.aerolineaServicio.obtenerListaDeAerolineas().subscribe(dato => {
      this.listaAerolineas = dato;
    });
  }

  obtenerAeropuertos(){
    this.aeropuertoService.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos = dato1;
    });
 
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
}
