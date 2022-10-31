import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { AerolineaService } from '../aerolinea.service';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-consultar-d-a-aerpuertos',
  templateUrl: './consultar-d-a-aerpuertos.component.html',
  styleUrls: ['./consultar-d-a-aerpuertos.component.css']
})
export class ConsultarDAAerpuertosComponent implements OnInit {
  shouldRun = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private route: ActivatedRoute, private aeropuertoservicio: AeropuertosService, private router: Router, private aerolineaServicio: AerolineaService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  idaero: number;
  id: number;
  aeropuertos: Aeropuertos[];

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
  ngOnInit(): void {
    this.idaero = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.obtenerAeropuertos(this.id);
  }

  nuevaConsulta() {
    this.router.navigate(['/consultas-Destinos', this.idaero]);
  }

   Imprimirpdf() {
    var doc = new jsPDF();
    autoTable(doc,{html:"table"});
    doc.save("destinosAutorizados")
   }

  obtenerAeropuertos(id: number) {
    this.aeropuertoservicio.traerAeropuertoConsu(id).subscribe(dato => {
      this.aeropuertos = dato
      if (this.aeropuertos.length == 0) {
        swal('ERROR', `la aerolinea consultada no tiene Destinos autorizados`, `error`)
        this.router.navigate(['/consultas-Destinos', this.idaero]);
      }
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
        this.router.navigate(['/crear-vuelo', this.idaero]);
        break;
      default:
        break;
    }
  }

  fileName= 'destinosAutorizados.xlsx';

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
