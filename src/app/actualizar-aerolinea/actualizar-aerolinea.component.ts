import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';

@Component({
  selector: 'app-actualizar-aerolinea',
  templateUrl: './actualizar-aerolinea.component.html',
  styleUrls: ['./actualizar-aerolinea.component.css']
})
export class ActualizarAerolineaComponent implements OnInit {
  formulariobeta = new FormGroup({
    nombreaerolinea: new FormControl(),
    correo: new FormControl(),
    codigopais: new FormControl(),
    numerotelefono: new FormControl(),
    idaeropuerto: new FormControl()
  });

  id: number;
  listaAeropuertos: listaAeropuertos[];
  aerolinea: Aerolinea = new Aerolinea();
  iduser: number;
  Home() {
    this.router.navigate(['/home']);
  }
  constructor(private aerolineaservicio: AerolineaService, private router: Router, private route: ActivatedRoute, private aeropuertoservicio: AeropuertosService) { }

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.aerolineaservicio.obtenerAerolineaPorId(this.id).subscribe(dato => {
      this.aerolinea = dato;
    }, error => console.log(error))
    this.aeropuertoservicio.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos=dato1;
    })
  }

  enviaralista(){
    this.router.navigate(["/Aerolineas",  this.iduser])
    swal('Aerolinea actualizado', `La Aerolinea ${this.aerolinea.nombreaerolinea} ha sido actualizado con exito`, `success`);
  }

  Prueba(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    
    const aerolinea: Aerolinea = {
      idaerolineas: this.id,
      nombreaerolinea: this.formulariobeta.get("nombreaerolinea")?.value??this.aerolinea.nombreaerolinea,
      correo: this.formulariobeta.get("correo")?.value??this.aerolinea.correo,
      codigopais: this.formulariobeta.get("codigopais")?.value??this.aerolinea.codigopais,
      numerotelefono: this.formulariobeta.get("numerotelefono")?.value??this.aerolinea.numerotelefono,
      idestado: this.aerolinea.idestado,
      idusuariocreacion: this.aerolinea.idusuariocreacion,
      vuelos:this.aerolinea.vuelos,
      aviones: this.aerolinea.aviones,
      idaeropuerto: this.formulariobeta.get("idaeropuerto")?.value??this.aerolinea.idaeropuerto,
      fechacreacion: this.aerolinea.fechacreacion,
      fechamodicar: desdeStr,
      usuariomodi:1,

    }

    console.log(aerolinea);
    this.aerolineaservicio.actualizarAerolinea(this.iduser,this.id, aerolinea).toPromise().then(dato => {
      this.enviaralista();
    }, error => swal('ERROR', `Hubo problemas al Nodificar la aerolinea, Porfavor intenta de nuevo`, `error`))


  }



}
