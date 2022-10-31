import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { Avion } from '../avion';
import { AvionService } from '../avion.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-consultar-aviones',
  templateUrl: './consultar-aviones.component.html',
  styleUrls: ['./consultar-aviones.component.css']
})
export class ConsultarAvionesComponent implements OnInit {
  avion:Avion[];

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
  shouldRun = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private avionServicio:AvionService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private route: ActivatedRoute,private router: Router, private aerolineaServico:AerolineaService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  idaero: number;
  id: number;
  aerolinea: Aerolinea;
  nombreAerolinea:string;
  ngOnInit(): void {
    this.idaero = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
     this.obtenerAerolinea(this.id)
     this.traeraviones(this.id)
  }

  nuevaConsulta() {
    this.router.navigate(['/consultas-aerolineas-aviones', this.idaero]);
  }

  Imprimirpdf() {
    var doc = new jsPDF();
    autoTable(doc,{html:"table"});
    doc.save("Aviones_Aerolinea")
   }


  obtenerAerolinea(id: number){
    this.aerolineaServico.obtenerAerolineaPorId(id).subscribe(dato =>{
      this.aerolinea = dato
      this.nombreAerolinea = this.aerolinea.nombreaerolinea;
    })
  }

  irMenus(nombre: string) {
    console.log(nombre)
 switch (nombre) {
      case "HOME":
        this.router.navigate(['/pantalla-principal', this.idaero]);
        break;
      case "PASAJEROS POR VUELO":
        this.router.navigate(['/consultar-pasajeros',  this.idaero]);
        break;
      case "EQUIPAJE POR VUELO":
        this.router.navigate(['/consultar-equipaje-vuelo',  this.idaero]);
        break;
        case "VUELOS":
          this.router.navigate(['/consulta-vuelo',  this.idaero]);
          break;
        case "AEROLINEAS":
          this.router.navigate(['/consultas-aerolineas/aeropuertos', this.idaero]);
          break;
      case "AVIONES":
        this.router.navigate(['/consultas-aerolineas-aviones', this.idaero]);
        break;
      case "DESTINOS":
        this.router.navigate(['/consultas-Destinos', this.idaero]);
        break;
      case "CREAR TRIPULACION":
        this.router.navigate(['/crear-tripulacion', this.idaero]);
        break;
      case "CREAR AVION":
        this.router.navigate(['/crear-aviones', this.idaero]);
        break;
      case "AGREGAR VUELO":
        this.router.navigate(['/crear-vuelo', this.id]);
        break;
      default:
        break;
    }
  }

  traeraviones(id:number){
    this.avionServicio.obtenerAvionAerolinea(this.idaero,id).subscribe(dato =>{
      this.avion = dato
      if(this.avion.length == 0){
        swal('ERROR', `La aerolínea consultada no tiene aviones`, `error`)
        this.router.navigate(['/consultas-aerolineas-aviones', this.idaero]);
      }
    })
  }


  fileName= 'Aviones_Aerolinea.xlsx';

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
}
