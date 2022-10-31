import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import swal from 'sweetalert2';
import { VueloService } from '../vuelo.service';
import { vueloconsulta } from '../vuelo';
@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  formulariobeta = new FormGroup({
    fechadesde: new FormControl(),
    fechahasta: new FormControl(),
    horadesde: new FormControl(),
    horahasta: new FormControl(),
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
  shouldRun = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private vueloServicio:VueloService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private route: ActivatedRoute,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }
  fechadesde:string;
  fechahasta:string;
  horadesde:string;
  horahasta:string;
   vuelolista:vueloconsulta[];
  mostrar:boolean =false;
  id:number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
  nuevaConsulta() {
    this.fechadesde = this.formulariobeta.get("fechadesde")?.value;
    this.fechahasta= this.formulariobeta.get("fechahasta")?.value;
    this.horadesde= this.formulariobeta.get("horadesde")?.value;
    this.horahasta= this.formulariobeta.get("horahasta")?.value;
    if(this.fechadesde == null  || this.fechahasta == null || this.horadesde == null || this.fechahasta ==null){
      swal('ERROR', `Porfavor llene los campos `, `error`);
      this.mostrar=false;
    }else{
      this.vueloServicio.obtenerVuelos(this.fechadesde, this.fechahasta,this.horadesde,this.horahasta).subscribe(dato =>{
        this.vuelolista = dato;
        this.mostrar=true;
      })

    }

   
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
  Imprimirpdf() {
    var doc = new jsPDF();
    autoTable(doc,{html:"table"});
    doc.save("destinosAutorizados")
   }

  fileName= 'Vuelos.xlsx';

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
