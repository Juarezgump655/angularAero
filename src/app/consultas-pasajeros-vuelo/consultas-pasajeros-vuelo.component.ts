import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { vueloPasajeros } from '../vuelo';
import { VueloService } from '../vuelo.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-consultas-pasajeros-vuelo',
  templateUrl: './consultas-pasajeros-vuelo.component.html',
  styleUrls: ['./consultas-pasajeros-vuelo.component.css']
})
export class ConsultasPasajerosVueloComponent implements OnInit {
vista: boolean = false ;
aeropuertos: any;
  shouldRun = true;
  id:number;
  listapasajeros: vueloPasajeros[] = [];
  mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
  constructor(private vueloServicio:VueloService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , private route: ActivatedRoute, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

   formulariobeta = new FormGroup({
    numeroVuelo: new FormControl(),
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
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


  nuevaConsulta() {
    var id =  this.formulariobeta.get("numeroVuelo")?.value
    if(id != undefined){
      this.vueloServicio.obtenerPasajerosID(id).subscribe(dato =>{
        this.listapasajeros = dato;
        if(this.listapasajeros.length == 0){
          swal('Informacion', `La consulta no devolvio ningun resultado  `, `info`)
          this.vista = false
        }else{
          this.vista = true
        }

      
     })
    }else{
      swal('ERROR', `Debe de llenar el campos  `, `error`)
      this.vista = false
    }
    
     
    }


  

  Imprimirpdf() {
    var doc = new jsPDF();
    autoTable(doc,{html:"table"});
    doc.save("Pasajeros_vuelo")
   }

   fileName= 'Pasajeros_vuelo.xlsx';
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
