import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsuariosinternosService } from '../usuariosinternos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuariosinternos } from '../usuariosinternos';
import { AerolineaService } from '../aerolinea.service';
import { Aerolinea } from '../aerolinea';

@Component({
  selector: 'app-pantalla-trabajadores',
  templateUrl: './pantalla-trabajadores.component.html',
  styleUrls: ['./pantalla-trabajadores.component.css']
})
export class PantallaTrabajadoresComponent implements OnInit {
  mobileQuery: MediaQueryList;


  id: number;
  idaerolinea: number;
  usuarioInterno: Usuariosinternos = new Usuariosinternos();
  aerolinea: Aerolinea = new Aerolinea();
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

  constructor(private aerolineaservicio: AerolineaService, private router: Router , changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private usuarioInternoservicio: UsuariosinternosService, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.usuarioInternoservicio.obtenerUsuariosinternosPorId(this.id).subscribe(dato => {
      this.usuarioInterno = dato;
      this.aerolineaservicio.obtenerAerolineaPorId(this.usuarioInterno.idaerolinea).subscribe(dato => {
        this.aerolinea = dato;
      })
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

}