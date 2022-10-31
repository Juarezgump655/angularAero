import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-crear-aerolinea',
  templateUrl: './crear-aerolinea.component.html',
  styleUrls: ['./crear-aerolinea.component.css']
})
export class CrearAerolineaComponent implements OnInit {
  formulariobeta = new FormGroup({
    nombreaerolinea: new FormControl(),
    correo: new FormControl(),
    codigopais: new FormControl(),
    numerotelefono: new FormControl(),
    idaeropuerto: new FormControl(),
    aeropuerto: new FormControl<listaAeropuertos | null>(null, Validators.required),
    selectFormControl : new FormControl( '' , Validators.required)
  });
  listaAeropuertos: listaAeropuertos[];
  aerolinea: Aerolinea = new Aerolinea();

  constructor(private aerolineaservicio: AerolineaService, private router: Router, private aeropuertoservicio: AeropuertosService,private route:ActivatedRoute) { }
  id:number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aeropuertoservicio.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos=dato1;
      if(this.listaAeropuertos.length == 0){
        swal('ERROR', `Debe crear un aeropuerto primero, Porfavor intenta de nuevo`, `error`)
        this.router.navigate(['/Pantalla-administrador', this.id])
      }
      })
    
  } 

  Home() {
    this.router.navigate(['/home']);
  }



  Prueba(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    const aerolinea: Aerolinea = {
      idaerolineas: 0,
      nombreaerolinea: this.formulariobeta.get("nombreaerolinea")?.value,
      correo: this.formulariobeta.get("correo")?.value,
      codigopais: this.formulariobeta.get("codigopais")?.value,
      numerotelefono: this.formulariobeta.get("numerotelefono")?.value,
      idestado: 1,
      idusuariocreacion: this.id,
      vuelos: 0,
      aviones: 0,
      idaeropuerto:this.formulariobeta.get("idaeropuerto")?.value,
      fechacreacion: desdeStr,
      fechamodicar: desdeStr,
      usuariomodi: this.id,
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
        this.guardarAerolinea(aerolinea);
        swal(
          'Aerolinea Creado',
          'El Aerolinea ha sido creado con exito',
          'success'
        )
      }
    })
  }

  guardarAerolinea(aerolinea?: Aerolinea){
    this.aerolineaservicio.registrarAerolinea(aerolinea!).toPromise().then(dato =>{
      this.enviaralista();
    }, error => swal('ERROR', `Hubo problemas al crear la aerolinea, Porfavor intenta de nuevo`, `error`))
  }

  enviaralista(){
    this.router.navigate(["/Aerolineas",  this.id])
  }

  
}
