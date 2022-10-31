import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';

@Component({
  selector: 'app-detalle-aerolinea',
  templateUrl: './detalle-aerolinea.component.html',
  styleUrls: ['./detalle-aerolinea.component.css']
})
export class DetalleAerolineaComponent implements OnInit {
id:number;
aerolinea: Aerolinea;
  constructor(private route:ActivatedRoute, private aerolineaService:AerolineaService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aerolinea = new Aerolinea();
    this.aerolineaService.obtenerAerolineaPorId(this.id).subscribe(dato =>{
      this.aerolinea=dato;
      console.log(dato);
    })
  }

}
