import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-consultar-aeropuertos',
  templateUrl: './consultar-aeropuertos.component.html',
  styleUrls: ['./consultar-aeropuertos.component.css']
})



export class ConsultarAeropuertosComponent implements OnInit {
  formulariobeta = new FormGroup({
    numeroAeropuerto: new FormControl(),
    nombre: new FormControl(),
    direccion: new FormControl()
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
  ida:number;
  nombre: string;
  direccion: string;
  Aerolinea:Aeropuertos[];
  Aeropuertos:Aeropuertos[];
  id:number;
  shouldRun = true;
  mobileQuery: MediaQueryList;
  aerolinea: Aerolinea;
  nombreAerolinea: string;
  usuarioCreacion: Usuariosinternos;
  idaero:number;
  private _mobileQueryListener: () => void;
  constructor(private usuariosInternosServices: UsuariosinternosService,private aerolineaServicio: AerolineaService,private route:ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private aeropuertoservicio:AeropuertosService, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit(): void {
    this.nombreAerolinea = "";
    this.id = this.route.snapshot.params['id'];
    this.aeropuertoservicio.obtenerListaDeAeropuerto().subscribe(dato =>{
      this.Aeropuertos = dato;
    });
   this.traerdatos();
  }

  seleccionar(id: number){
    this.router.navigate(['/consultas-aerolinea',    this.id, id]);
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



  Prueba(){
    this.ida =this.formulariobeta.get("numeroAeropuerto")?.value;
    this.nombre= this.formulariobeta.get("nombre")?.value;
    this.direccion= this.formulariobeta.get("direccion")?.value;
    
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


  traerdatos(){
    this.usuariosInternosServices.obtenerUsuariosinternosPorId(this.id).subscribe(dato3 => {
      this.usuarioCreacion = dato3
      this.idaero = this.usuarioCreacion.idaerolinea;
      this.aerolineaServicio.obtenerAerolineaPorId(this.usuarioCreacion.idaerolinea).subscribe(dato => {
        this.aerolinea = dato;
        this.nombreAerolinea = this.aerolinea.nombreaerolinea;
      })
    })
  }

}
