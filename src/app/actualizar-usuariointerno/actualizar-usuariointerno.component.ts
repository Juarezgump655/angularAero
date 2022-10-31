import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Aerolinea, listaAerolinea } from '../aerolinea';
import { AerolineaService } from '../aerolinea.service';
import { listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { tablaRoles, Usuariosinternos } from '../usuariosinternos';
import { UsuariosinternosService } from '../usuariosinternos.service';

@Component({
  selector: 'app-actualizar-usuariointerno',
  templateUrl: './actualizar-usuariointerno.component.html',
  styleUrls: ['./actualizar-usuariointerno.component.css']
})
export class ActualizarUsuariointernoComponent implements OnInit {
 
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
  id:number;
  usuarioInterno : Usuariosinternos =new Usuariosinternos();
  listaAeropuertos: listaAeropuertos[];
  listaAerolinea: listaAerolinea[];
  listarol: tablaRoles[];
  iduser: number;
  constructor(private usuarioInternoservice: UsuariosinternosService, private router: Router, private route: ActivatedRoute,private aerolineaservicio: AerolineaService, private aeropuertoservicio: AeropuertosService) { }

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['idaero'];
    this.id = this.route.snapshot.params['id'];
    this.usuarioInternoservice.obtenerUsuariosinternosPorId(this.id).subscribe(dato => {
      this.usuarioInterno = dato;
      console.log(dato);
    }, error => console.log(error))
    this.aeropuertoservicio.obtenerListaDeAeropuertos().subscribe(dato1 => {
      this.listaAeropuertos=dato1;
      })
      this.aerolineaservicio.obtenerAerolineas().subscribe(dato2 =>{
        this.listaAerolinea=dato2
      })
      this.usuarioInternoservice.obtenerListaDeRoles().subscribe(dato3 =>{
        this.listarol=dato3
      })

  }

  enviarLista() {
    this.router.navigate(["/UsuariosInternos",  this.iduser])
    swal('Usuario actualizado', `El Usuario ${this.usuarioInterno.nombres} ${this.usuarioInterno.apellidos} ha sido actualizado con exito`, `success`);
  }
  Home(){
    this.router.navigate(['/home']);
  }

  Prueba(): void {
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    const user: Usuariosinternos = {
      idusuariointerno: this.usuarioInterno.idusuariointerno,
      documentoidentificaion: this.formulariobeta.get("documentoidentificaion")?.value??this.usuarioInterno.documentoidentificaion,
      nombres: this.formulariobeta.get("nombres")?.value??this.usuarioInterno.nombres,
      apellidos: this.formulariobeta.get("apellidos")?.value??this.usuarioInterno.apellidos,
      fechanacimiento: this.formulariobeta.get("fechanacimiento")?.value??this.usuarioInterno.fechanacimiento,
      nacionalidad: this.formulariobeta.get("nacionalidad")?.value??this.usuarioInterno.nacionalidad,
      correo: this.formulariobeta.get("correo")?.value??this.usuarioInterno.correo,
      codigopais: this.formulariobeta.get("codigopais")?.value??this.usuarioInterno.codigopais,
      numerotelefoono: this.formulariobeta.get("numerotelefoono")?.value??this.usuarioInterno.numerotelefoono,
      numerotelefoonoem: this.formulariobeta.get("numerotelefoonoem")?.value??this.usuarioInterno.numerotelefoonoem,
      direccion: this.formulariobeta.get("direccion")?.value??this.usuarioInterno.direccion,
      contrasenia: this.formulariobeta.get("contrasenia")?.value??this.usuarioInterno.contrasenia,
      idestado: this.usuarioInterno.idestado,
      usariocreacion: this.usuarioInterno.usariocreacion,
      fechacreacion:this.usuarioInterno.fechacreacion,
      fechamodicar: desdeStr,
      idaeropuerto: this.formulariobeta.get("idaeropuerto")?.value??this.usuarioInterno.idaeropuerto,
      idaerolinea: this.formulariobeta.get("idaerolinea")?.value??this.usuarioInterno.idaerolinea,
      idroles: this.formulariobeta.get("idrol")?.value??this.usuarioInterno.idroles,
      usuariomodi: this.iduser,

    }
    this.usuarioInternoservice.actualizarUsuariosinternos( this.iduser ,this.id, user).toPromise().then(dato => {
      this.enviarLista();
    }, error => swal('ERROR', `Hubo problemas al modificar el Usuario, Porfavor intenta de nuevo`, `error`))


  }

}
