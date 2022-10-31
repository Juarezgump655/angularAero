import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-admin',
  templateUrl: './pantalla-admin.component.html',
  styleUrls: ['./pantalla-admin.component.css']
})
export class PantallaAdminComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }
 id:number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
  }



  Home(){
    this.router.navigate(['/home']);
  }

  irUsuarios(){
    this.router.navigate(['/UsuariosInternos', this.id]);
  }

  irAeropuerto(){
    this.router.navigate(['/Aeropuerto', this.id]);
  }

  irAerolinea(){
    this.router.navigate(['/Aerolineas', this.id]);
  }
  
}
