import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { listaAerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { Usuario } from '../usuario';
import { tablaRoles, Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-crear-usuariointer',
  templateUrl: './crear-usuariointer.component.html',
  styleUrls: ['./crear-usuariointer.component.css']
})
export class CrearUsuariointerComponent implements OnInit {
  formulariobeta = new FormGroup({
    documentoidentificaion: new FormControl(),
    nombres: new FormControl(),
    apellidos: new FormControl(),
    fechanacimiento: new FormControl(),
    nacionalidad: new FormControl(),
    correo: new FormControl(),
    codigopais: new FormControl(),
    numerotelefoono: new FormControl(),
    numerotelefoonoem: new FormControl(),
    direccion: new FormControl(),
    contrasenia: new FormControl(),
    idaeropuerto: new FormControl(),
    idaerolinea: new FormControl(),
    idrol: new FormControl()
  });
  listaAeropuertos: listaAeropuertos[];
  listaAerolineas: listaAerolinea[];
  usuarioInterno: Usuariosinternos = new Usuariosinternos();
  listarol: tablaRoles[];
 id:number;
  constructor(private route:ActivatedRoute,private usuarioInternoservice: UsuariosinternosService,private aerolineaService:AerolineaService,private aeropuertoservicio:AeropuertosService ,private router: Router) { }

  guardarUsuario(user?: Usuariosinternos) {
    console.log(user!);
    this.usuarioInternoservice.registrarUsuariosinternos(user!).toPromise().then(dato => {
      console.log(dato);
      this.enviarLista();
    },error => swal('ERROR', `Hubo problemas al crear el Usuario, Porfavor intenta de nuevo`, `error`))
  }

  enviarLista() {
    this.router.navigate(["/UsuariosInternos", this.id])
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.aeropuertoservicio.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos=dato1;
      if(this.listaAeropuertos.length == 0){
        swal('ERROR', `Debe crear un aeropuerto primero, Porfavor intenta de nuevo`, `error`)
        this.router.navigate(['/Pantalla-administrador', this.id])
      }
      })
      this.aerolineaService.obtenerAerolineas().subscribe(dato2 =>{
        this.listaAerolineas=dato2
        if(this.listaAerolineas.length == 0){
          swal('ERROR', `Debe crear una Aerolinea primero, Porfavor intenta de nuevo`, `error`)
          this.router.navigate(['/Pantalla-administrador', this.id])
        }
      })
      this.usuarioInternoservice.obtenerListaDeRoles().subscribe(dato3 =>{
        this.listarol=dato3
      })
  

  }
  Home(){
    this.router.navigate(['/home']);
  }

  Prueba(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    const user: Usuariosinternos = {
      idusuariointerno: 0,
      documentoidentificaion: this.formulariobeta.get("documentoidentificaion")?.value,
      nombres: this.formulariobeta.get("nombres")?.value,
      apellidos: this.formulariobeta.get("apellidos")?.value,
      fechanacimiento: this.formulariobeta.get("fechanacimiento")?.value,
      nacionalidad: this.formulariobeta.get("nacionalidad")?.value,
      correo: this.formulariobeta.get("correo")?.value,
      codigopais: this.formulariobeta.get("codigopais")?.value,
      numerotelefoono: this.formulariobeta.get("numerotelefoono")?.value,
      numerotelefoonoem: this.formulariobeta.get("numerotelefoonoem")?.value,
      direccion: this.formulariobeta.get("direccion")?.value,
      contrasenia: this.formulariobeta.get("contrasenia")?.value,
      idestado: 1,
      usariocreacion: this.id,
      fechacreacion: desdeStr,
      fechamodicar: desdeStr,
      idaeropuerto: this.formulariobeta.get("idaeropuerto")?.value,
      idaerolinea: this.formulariobeta.get("idaerolinea")?.value,
      idroles: this.formulariobeta.get("idrol")?.value,
      usuariomodi :this.id,

    }
    console.log(user);


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
        this.guardarUsuario(user);
        swal(
          'Usuario Creado',
          'El Usuario ha sido creado con exito',
          'success'
        )
      }
    })

  }


}
