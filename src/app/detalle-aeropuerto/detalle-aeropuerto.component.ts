import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';


@Component({
  selector: 'app-detalle-aeropuerto',
  templateUrl: './detalle-aeropuerto.component.html',
  styleUrls: ['./detalle-aeropuerto.component.css']
})
export class DetalleAeropuertoComponent implements OnInit {
  id:number;
  aeropuerto : Aeropuertos;
  constructor(private route:ActivatedRoute, private aeropuertoServicio:AeropuertosService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aeropuerto = new Aeropuertos();
    this.aeropuertoServicio.obtenerAeropuertoPorId(this.id).subscribe(dato =>{
      this.aeropuerto=dato;
      console.log(dato);
    })
  }

}
