import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Asiento } from '../asiento';
import { AsientoService } from '../asiento.service';
import { Avion } from '../avion';
import { AvionService } from '../avion.service';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit {
  shouldRun = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  id:number;
  idavion:number;
  avion: Avion;
  tamanio: boolean = false;
  vuelo: boolean = false;
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  usuarioInterno: Usuariosinternos;
  numeroAsientos:number;
  listaasientos: number[] = [];
  numeroasientosd: number;
  formulariobeta = new FormGroup({
    marca: new FormControl(),
    modelo: new FormControl(),
    vuelos: new FormControl(),
    anio: new FormControl(),
    asiento: new FormControl(),
  });
  listaAviones : Avion[];
  noasientos:number;
  constructor(private avionServiocio:AvionService,private asientoServicio:AsientoService,private avionServicio:AvionService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private route: ActivatedRoute, private router: Router, private usuarioInternoServicio: UsuariosinternosService) {
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.traerUsuario()
  }

  
  vistaPrevia(){
    //se guarda en la variable el numero de asientos que desamos ver
    this.numeroAsientos = this.formulariobeta.get("asiento")?.value
    this.hacermatriz(this.numeroAsientos); 
    if(this.numeroAsientos > 1000){
      swal('ERROR', `La cantidad maxima de asientos es 1000, Porfavor intenta de nuevo`, `error`)
    } else if(this.numeroAsientos == null){
      swal('ERROR', `Necesita llenar los asientos, Porfavor intenta de nuevo`, `error`)
    }else{
    
      if (this.numeroAsientos <= 250) {
        this.numeroasientosd = 4;
        console.log("El avion es menor a 250 se dividira en : ", this.numeroasientosd, " columnas")
        this.displayedColumns = ['A', 'B', 'C', 'D'];
        this.tamanio = false;
      } else {
        this.numeroasientosd = 6;
        console.log("El avion es mayor a 251 se dividira en : ", this.numeroasientosd, " columnas")
        this.displayedColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.tamanio = true;
      }

      
      const asientos = []
      var iterador = 0;
      for (let f = 0; f < (this.listaasientos.length / this.numeroasientosd); f++) {

        //el asiento en la f sera un asientos con datos vacio
        asientos[f] = {}

        for (let c = 0; c < this.numeroasientosd; c++) {
          asientos[f][c] = this.listaasientos[iterador]
          iterador++;
        }
      }

      this.dataSource.data = asientos;
      console.log(asientos);
      this.vuelo = true;
    }
        
    }

    //se una lista con el numero de asientos
    hacermatriz(casiento: number){
      this.listaasientos = [];
      for (let index = 0; index < casiento; index++) {
       this.listaasientos[index] = index+1;
      }
      console.log(this.listaasientos)
    }

    eliminarAeropuerto(id:number){
      swal({
        title: '¿Estas seguro?',
        text: "Confirma si deseas eliminar al usuario",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si , elimínalo',
        cancelButtonText: 'No, cancelar',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.eliminarAvion(id)
            swal(
              'Aeropuerto eliminado',
              'El Aeropuerto ha sido eliminado con exito',
              'success'
            )  
        }
      })
    }


  
    actualizarAerpuerto(id:number){
      this.router.navigate(['actualizar-aviones', this.id, id])
    
    }


    traerUsuario(){
      this.usuarioInternoServicio.obtenerUsuariosinternosPorId(this.id).subscribe(dato1 => {
        this.usuarioInterno = dato1
        this.traerAviones(this.usuarioInterno.idaerolinea)
      })
    }

  onSubmit(){
    if(this.formulariobeta.get("asiento")?.value == undefined){
      swal('ERROR', `necesita llenar los asientos, Porfavor intenta de nuevo`, `error`)
      }else{
        this.usuarioInternoServicio.obtenerUsuariosinternosPorId(this.id).subscribe(dato1 => {
          this.usuarioInterno = dato1
          let fecha = new Date();
          let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
        const avion: Avion ={
          idavion: 0,
          marca:  this.formulariobeta.get("marca")?.value,
          modelo: this.formulariobeta.get("modelo")?.value,
          vuelos: this.formulariobeta.get("vuelos")?.value??0,
          idestado: 1,
          idaerolinea: this.usuarioInterno.idaerolinea,
          fechacreacion: desdeStr,
          fechamodicar: desdeStr,
          idusuariocreacion: this.id,
          idaeropuerto: this.usuarioInterno.idaeropuerto,
          usuariomodi: this.id,
          anio:this.formulariobeta.get("anio")?.value,
          asientos:this.formulariobeta.get("asiento")?.value
        }

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
           this.crearavion(avion);
            this.traerUsuario();
          }
        })
       });
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

  //EL mejor metodo xd
  crearavion(avion?: Avion){
    this.noasientos = this.formulariobeta.get("asiento")?.value;
    this.avionServicio.registrarAvion(avion!).toPromise().then(dato =>{
      console.log( dato?.idavion)

      const asiento: Asiento={
        id_asiento: 0,
        asiento: 0,
        id_avion: 0,
        id_estado: 0,
        fechacreacion: '',
        fechamodicar: ''
      }
      this.asientoServicio.crearasientos(this.noasientos, dato?.idavion, asiento!).toPromise().then(dato =>{
        swal('Objetos Creados', `Se creo el avion y los asientos Correctamente`, `success`)
        this.traerUsuario();
      }, error => swal('ERROR', `Hubo problemas al crear los asientos, Porfavor intenta de nuevo`, `error`));


    }, error => swal('ERROR', `Hubo problemas al crear el Aeropuerto, Porfavor intenta de nuevo`, `error`))
  }


  traerAviones(id: number){
    this.avionServicio.obtenerAvionAerolineac(this.id, id).subscribe(dato => {
      this.listaAviones = dato;
    }, error => swal('ERROR', `Hubo problemas para traer los aviones`, `error`))
  }

eliminarAvion(id: number){
  let fecha = new Date();
  let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
  this.avionServicio.obtenerAvionId(id).subscribe(dato =>{
    const avion : Avion={
      idavion:  dato.idavion,
      marca: dato.marca,
      modelo: dato.modelo,
      vuelos: dato.vuelos,
      idestado: 5,
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
