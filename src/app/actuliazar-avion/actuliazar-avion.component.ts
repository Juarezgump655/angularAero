import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Avion } from '../avion';
import { AvionService } from '../avion.service';

@Component({
  selector: 'app-actuliazar-avion',
  templateUrl: './actuliazar-avion.component.html',
  styleUrls: ['./actuliazar-avion.component.css']
})
export class ActuliazarAvionComponent implements OnInit {
  avio: Avion = new Avion();
  constructor(private avionServiocio:AvionService,private route: ActivatedRoute, private router: Router) { }
  formulariobeta = new FormGroup({
    marca: new FormControl(),
    modelo: new FormControl(),
    vuelos: new FormControl(),
    anio: new FormControl(),
    asiento: new FormControl({value: '', disabled: true}, Validators.required),
  });
  iduser:number;
  id:number;

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.traeravion(this.id)
  }

  

  traeravion(id:number){
    this.avionServiocio.obtenerAvionId(id).subscribe(dato =>{
      this.avio = dato
      console.log(dato)
    })
  }

  onSubmit(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    const avion: Avion ={
      idavion: this.avio.idavion,
      marca: this.formulariobeta.get("marca")?.value ?? this.avio.marca,
      modelo: this.formulariobeta.get("modelo")?.value ?? this.avio.modelo,
      vuelos: this.formulariobeta.get("vuelos")?.value ?? this.avio.vuelos,
      idestado: this.avio.idestado,
      idaerolinea: this.avio.idaerolinea,
      fechacreacion: this.avio.fechacreacion,
      fechamodicar: desdeStr,
      idusuariocreacion: this.avio.idusuariocreacion,
      idaeropuerto: this.avio.idaeropuerto,
      usuariomodi: this.iduser ,
      anio:this.formulariobeta.get("anio")?.value ?? this.avio.anio,
      asientos: this.avio.asientos
    }
    this.avionServiocio.actualizarAvion(this.iduser, this.id, avion).toPromise().then(dato =>{
      swal('Avion actualizado', `El Avion ${this.avio.modelo} ha sido actualizado con exito`, `success`);
      this.router.navigate(['crear-aviones', this.iduser ]);
    }, error => swal('ERROR', `Hubo problemas al modificar el Avion, Porfavor intenta de nuevo`, `error`))



  }

}
