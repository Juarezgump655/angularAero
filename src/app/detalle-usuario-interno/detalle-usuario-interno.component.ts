import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-detalle-usuario-interno',
  templateUrl: './detalle-usuario-interno.component.html',
  styleUrls: ['./detalle-usuario-interno.component.css']
})
export class DetalleUsuarioInternoComponent implements OnInit {
 id:number;
 usuarioInterno: Usuariosinternos;
  constructor(private route:ActivatedRoute, private usuarioInternoService:UsuariosinternosService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuarioInterno = new Usuariosinternos();
    this.usuarioInternoService.obtenerUsuariosinternosPorId(this.id).subscribe(dato =>{
      this.usuarioInterno=dato;
      console.log(dato)
    })
  }

}
