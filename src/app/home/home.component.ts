import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuarioServicio: UsuarioService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  Login(){
    this.router.navigate(['/iniciar-sesion']);
  }

}
