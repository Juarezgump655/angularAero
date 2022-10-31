import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Puerta } from '../puerta';
import { PuertaService } from '../puerta.service';

@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css']
})
export class CrearAeropuertoComponent implements OnInit {
  formulariobeta = new FormGroup({
    nombreaeropuerto: new FormControl(),
    nopuertas: new FormControl(),
    direccion: new FormControl(),
    pais: new FormControl(),
    notelefono: new FormControl()
  });
  id:number;
  aeropuerto: Aeropuertos = new Aeropuertos();

  constructor(private puertaServicio:PuertaService,private route:ActivatedRoute, private aeropuertoservicio:AeropuertosService, private router: Router,) { }
  numeroPuertas:number;
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  Home(){
    this.router.navigate(['/home']);
  }
  Prueba(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0'+(fecha.getMonth()+1)).slice(-2)}-${fecha.getFullYear()}`;
  const aeropuerto: Aeropuertos ={
    idaeropuerto: 0,
    nombreaeropuerto: this.formulariobeta.get("nombreaeropuerto")?.value,
    nopuertas: this.formulariobeta.get("nopuertas")?.value,
    direccion: this.formulariobeta.get("direccion")?.value,
    pais: this.formulariobeta.get("pais")?.value,
    notelefono: this.formulariobeta.get("notelefono")?.value,
    idestado: 1,
    fechacreacion: desdeStr,
    fechamodicar: desdeStr,
    idusuariocreacion: this.id,
    usuarioModi:this.id,
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
      this.guardarAeropuerto(aeropuerto);
      swal(
        'Aeropuerto Creado',
        'El Aeropuerto ha sido creado con exito',
        'success'
      )
    }
  })

    }

  guardarAeropuerto(aeropuerto?: Aeropuertos){
    this.numeroPuertas = this.formulariobeta.get("nopuertas")?.value,
    this.aeropuertoservicio.registrarAeropuerto(aeropuerto!).toPromise().then(dato =>{

      const puerta: Puerta={
        id_puerta: 0,
        puertanu: 0,
        id_aeropuerto: 0,
        id_estado: 0,
        fechacreacion: '',
        fechamodicar: ''
      }
      this.puertaServicio.crearPuerta(this.numeroPuertas, dato?.idaeropuerto, puerta!).toPromise().then(dato =>{
        swal('Objetos Creados', `Se creo el Aeropuerto y las puertas Correctamente`, `success`)
      }, error => swal('ERROR', `Hubo problemas al crear las puertas, Porfavor conctacta con administracion`, `error`));

    }, error => swal('ERROR', `Hubo problemas al crear el Aeropuerto, Porfavor intenta de nuevo`, `error`))
  }

  enviaralista(){
    this.router.navigate(["/Aeropuerto",  this.id])
  }




}
