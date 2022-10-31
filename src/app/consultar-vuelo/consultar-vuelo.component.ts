import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ciudad } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Avion } from '../avion';
import { vuelotable } from '../vuelo';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-consultar-vuelo',
  templateUrl: './consultar-vuelo.component.html',
  styleUrls: ['./consultar-vuelo.component.css']
})
export class ConsultarVueloComponent implements OnInit {
  listavuelo: vuelotable[];
  listaaviones: Avion[];
  ListaCiudades: ciudad[];
  fecha:string;
  idaero:number;
  table:boolean = false;
  formulariobeta = new FormGroup({
    fechasalida: new FormControl(),
    idaeropuerto: new FormControl(),

  });
  fromularioBoleto = new FormGroup({
    maletas: new FormControl(),

  });

  formularioAsientos = new FormGroup({
    noAsientos: new FormControl(),
  });
  constructor(private vueloServicio:VueloService,private router: Router,private route:ActivatedRoute, private aeropuertoServicio:AeropuertosService) { }

  ngOnInit(): void {
    this.traerCiudad() 
  }

  seleccionarAvion(id: number){
    swal('Informacion', `Primero debes crear un usuario para poder hacer tu compra`, `info`)
    this.router.navigate(['/registrar-usuario', id]);
  }
  filtro() {
    this.traerVuelo();
  }


  traertodos(){
    this.vueloServicio.obtenerListavuelos().subscribe(dato =>{
      this.listavuelo =dato;
      this.table = true;
    })
  }

  Home(){
    this.router.navigate(['/home']);
  }


  traerCiudad() {
    this.aeropuertoServicio.traerCiudades().subscribe(dato => {
      this.ListaCiudades = dato;
    })
  }

  traerVuelo() {
    this.fecha = this.formulariobeta.get("fechasalida")?.value
    this.idaero=  this.formulariobeta.get("idaeropuerto")?.value

    if(this.fecha == null && this.idaero== null){
      swal('ERROR', `Debe de llenar los campos  `, `error`)
    }else{
      this.vueloServicio.obtenerListavuelosFiltro(this.fecha , this.idaero).subscribe(dato => {
        this.listavuelo = dato;
        if(this.listavuelo.length ==0){
          swal('Informacion', `No hay vuelos con los parametros ingresados `, `info`)
        }else{
          console.log(dato)
          this.table = true;
        }
      })
    }
  
  }

}
