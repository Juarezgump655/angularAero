import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { Aeropuertos, direccion } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Usuariosinternos } from '../usuariosinternos';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-consultar-aerolineas',
  templateUrl: './consultar-aerolineas.component.html',
  styleUrls: ['./consultar-aerolineas.component.css']
})
export class ConsultarAerolineasComponent implements OnInit {
  Aerolineas: Aerolinea[];
  aeropuerto: Aeropuertos;
  direccion: direccion[];
  shouldRun = true;
  mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
  constructor(private route: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , private aeropuertoservicio: AeropuertosService, private router: Router, private aerolineaServicio: AerolineaService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  idaero: number;
  id: number;
  paises:string;
  NombreAeropuerto: string;
  otrospaises:string;


  aerolinea: Aerolinea;
  nombreAerolinea: string;
  usuarioCreacion: Usuariosinternos;


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
    this.paises= "";
    this.idaero = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.traeraeropuerto(this.id);
    this.traeraerolineas(this.id);
  }

  nuevaConsulta() {
    this.router.navigate(['consultas-aerolineas/aeropuertos', this.idaero]);
  }

  Imprimirpdf() {
    var doc = new jsPDF();
    autoTable(doc,{html:"table"});
    doc.save("Aerolineas")
  
  }

  traeraeropuerto(id: number) {
    this.aeropuertoservicio.obtenerAeropuertoPorId(id).subscribe(dato => {
      this.aeropuerto = dato
      this.NombreAeropuerto = this.aeropuerto.nombreaeropuerto;
    })




  }
  traeraerolineas(id: number) {
    this.aerolineaServicio.consultaAerolineas(this.idaero, id).subscribe(dato => {
      this.Aerolineas = dato

      if( this.Aerolineas.length == 0){
        swal('ERROR', `El aeropuerto consultado no tiene aerolíneas`, `error`)
        
        this.router.navigate(['consultas-aerolineas/aeropuertos', this.idaero]);
      }else if (this.Aerolineas.length != 0) {
        this.enlistarPais(id)
      }

    })

  }
  enlistarPais(id: number) {
    this.aeropuertoservicio.traerDireccion(id).subscribe(dato2 => {
      this.direccion = dato2
      

      for (let index = 0; index <   this.direccion.length; index++) {
        if(index == 0){
          this.paises = this.direccion[index].pais + ", "
        }else if(index == this.direccion.length-1){
          this.paises = this.paises +"  " + this.direccion[index].pais + "." 
        }else{
          this.paises = this.paises +"  " + this.direccion[index].pais + ", " 
        }
      
      }
      console.log( this.paises );
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

  fileName= 'Aerolineas.xlsx';

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
