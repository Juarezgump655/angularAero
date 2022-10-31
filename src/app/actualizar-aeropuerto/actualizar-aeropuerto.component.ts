import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-actualizar-aeropuerto',
  templateUrl: './actualizar-aeropuerto.component.html',
  styleUrls: ['./actualizar-aeropuerto.component.css']
})
export class ActualizarAeropuertoComponent implements OnInit {

  constructor(private aeropuertoservicio: AeropuertosService, private router: Router, private route: ActivatedRoute) { }
  formulariobeta = new FormGroup({
    nombreaeropuerto: new FormControl(),
    nopuertas: new FormControl(),
    direccion: new FormControl(),
    pais: new FormControl(),
    notelefono: new FormControl()
  });

  id: number;
  iduser: number;
  aeropuertos: Aeropuertos = new Aeropuertos();
  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.aeropuertoservicio.obtenerAeropuertoPorId(this.id).subscribe(dato => {
      this.aeropuertos = dato;
    }, error => console.log(error))
  }

  irListaAeropuerto() {
    this.router.navigate(['/Aeropuerto', this.iduser]);
    swal('Aeropuerto actualizado', `El Aeropuerto ${this.aeropuertos.nombreaeropuerto} ha sido actualizado con exito`, `success`);
  }

  onSubmit() {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    const aeropuerto: Aeropuertos = {
      idaeropuerto: this.id,
      nombreaeropuerto: this.formulariobeta.get("nombreaeropuerto")?.value ?? this.aeropuertos.nombreaeropuerto,
      nopuertas: this.formulariobeta.get("nopuertas")?.value ?? this.aeropuertos.nopuertas,
      direccion: this.formulariobeta.get("direccion")?.value ?? this.aeropuertos.direccion,
      pais: this.formulariobeta.get("pais")?.value ?? this.aeropuertos.pais,
      notelefono: this.formulariobeta.get("notelefono")?.value ?? this.aeropuertos.notelefono,
      idestado: this.aeropuertos.idestado,
      fechacreacion: this.aeropuertos.fechacreacion,
      fechamodicar: desdeStr,
      idusuariocreacion: this.aeropuertos.idusuariocreacion,
      usuarioModi:this.iduser 
    }
    console.log(aeropuerto)

    this.aeropuertoservicio.actualizarAeropuerto(this.iduser, this.id, aeropuerto).toPromise().then(dato => {
      this.irListaAeropuerto();
    }, error => swal('ERROR', `Hubo problemas al modificar el Aeropuerto, Porfavor intenta de nuevo`, `error`))
  }

  Home() {
    this.router.navigate(['/home']);
  }
}
