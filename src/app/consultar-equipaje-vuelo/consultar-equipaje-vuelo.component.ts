import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloService } from '../vuelo.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { vueloPasajeros } from '../vuelo';
import swal from 'sweetalert2';
import { BoletosService } from '../boletos.service';
import { maletas } from '../boletos';
import { UsuariosinternosService } from '../usuariosinternos.service';
import { Usuariosinternos } from '../usuariosinternos';
import { data } from 'jquery';
@Component({
  selector: 'app-consultar-equipaje-vuelo',
  templateUrl: './consultar-equipaje-vuelo.component.html',
  styleUrls: ['./consultar-equipaje-vuelo.component.css']
})
export class ConsultarEquipajeVueloComponent implements OnInit {
  vista: boolean = false ;
  aeropuertos: any;
    shouldRun = true;
    id:number;
    mobileQuery: MediaQueryList;
    listaMaletas: maletas[] = [];
    usuario: Usuariosinternos;
    idAero: number;
    private _mobileQueryListener: () => void;
  constructor(private usuarioServicio:UsuariosinternosService,private boletoServicio:BoletosService,private vueloServicio:VueloService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , private route: ActivatedRoute, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }



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
  formulariobeta = new FormGroup({
    numeroVuelo: new FormControl(),
  });


  nuevaConsulta() {
    var id =  this.formulariobeta.get("numeroVuelo")?.value
    if(id != undefined){
      this.boletoServicio.maletas(id,  this.idAero).subscribe(dato =>{
        this.listaMaletas = dato;
        if(this.listaMaletas.length == 0){
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuarioServicio.obtenerUsuariosinternosPorId(this.id).subscribe(data =>{
      this.usuario= data;
      this.idAero = this.usuario.idaerolinea;
      console.log(this.usuario)
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
    doc.save("Maletas_vuelo")
   }

   fileName= 'Maletas_vuelo.xlsx';
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
