import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarAerolineaComponent } from './actualizar-aerolinea/actualizar-aerolinea.component';
import { ActualizarAeropuertoComponent } from './actualizar-aeropuerto/actualizar-aeropuerto.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { ActualizarUsuariointernoComponent } from './actualizar-usuariointerno/actualizar-usuariointerno.component';
import { ActuliazarAvionComponent } from './actuliazar-avion/actuliazar-avion.component';
import { ConsultaVuelosUsuarioComponent } from './consulta-vuelos-usuario/consulta-vuelos-usuario.component';
import { ConsultarAerolineasComponent } from './consultar-aerolineas/consultar-aerolineas.component';
import { ConsultarAerolineasavionesComponent } from './consultar-aerolineasaviones/consultar-aerolineasaviones.component';
import { ConsultarAeropuertosComponent } from './consultar-aeropuertos/consultar-aeropuertos.component';
import { ConsultarAvionesComponent } from './consultar-aviones/consultar-aviones.component';
import { ConsultarDAAerpuertosComponent } from './consultar-d-a-aerpuertos/consultar-d-a-aerpuertos.component';
import { ConsultarDestinosAutorizadosComponent } from './consultar-destinos-autorizados/consultar-destinos-autorizados.component';
import { ConsultarEquipajeVueloComponent } from './consultar-equipaje-vuelo/consultar-equipaje-vuelo.component';
import { ConsultarVueloComponent } from './consultar-vuelo/consultar-vuelo.component';
import { ConsultasPasajerosVueloComponent } from './consultas-pasajeros-vuelo/consultas-pasajeros-vuelo.component';
import { CrearAerolineaComponent } from './crear-aerolinea/crear-aerolinea.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { CrearTripulacionComponent } from './crear-tripulacion/crear-tripulacion.component';
import { CrearUsuariointerComponent } from './crear-usuariointer/crear-usuariointer.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { DetalleAerolineaComponent } from './detalle-aerolinea/detalle-aerolinea.component';
import { DetalleAeropuertoComponent } from './detalle-aeropuerto/detalle-aeropuerto.component';
import { DetalleUsuarioInternoComponent } from './detalle-usuario-interno/detalle-usuario-interno.component';
import { HomeComponent } from './home/home.component';
import { IniciarSesionTrabajoComponent } from './iniciar-sesion-trabajo/iniciar-sesion-trabajo.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ListaAerolineasComponent } from './lista-aerolineas/lista-aerolineas.component';
import { ListaAeropuertoComponent } from './lista-aeropuerto/lista-aeropuerto.component';
import { ListaUsuariosInternosComponent } from './lista-usuarios-internos/lista-usuarios-internos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PantallaAdminComponent } from './pantalla-admin/pantalla-admin.component';
import { PantallaTrabajadoresComponent } from './pantalla-trabajadores/pantalla-trabajadores.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { UsuarioDetallesComponent } from './usuario-detalles/usuario-detalles.component';
import { VuelosComponent } from './vuelos/vuelos.component';
//configurar las rutas cuando entremos a un navegador
const routes: Routes = [
  {path : 'Usuarios', component:ListaUsuariosComponent},
  {path : 'Usuarios/:id', component:ListaUsuariosComponent},
  {path : 'home', component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path : 'registrar-usuario', component : RegistrarUsuarioComponent},
  {path : 'registrar-usuario/:id', component : RegistrarUsuarioComponent},
  {path : 'actualizar-usuario/:id',component : ActualizarUsuarioComponent},
  {path : 'usuario-detalle/:id',component : UsuarioDetallesComponent},
  {path : 'iniciar-sesion',component : IniciarSesionComponent},
  {path : 'iniciar-sesion/:id',component : IniciarSesionComponent},
  {path : 'UsuariosInternos/:id',component : ListaUsuariosInternosComponent},
  {path : 'Aeropuerto/:id',component : ListaAeropuertoComponent},
  {path : 'Aerolineas/:id',component : ListaAerolineasComponent},
  {path : 'iniciar-sesionTrabajadores',component : IniciarSesionTrabajoComponent},
  {path : 'Pantalla-administrador/:id',component : PantallaAdminComponent},
  {path : 'Crear-aerolinea/:id',component : CrearAerolineaComponent},
  {path : 'Crear-aeropuerto/:id',component : CrearAeropuertoComponent},
  {path : 'actualizar-Aeropuerto/:idaero/:id',component : ActualizarAeropuertoComponent},
  {path : 'actualizar-Aerolinea/:idaero/:id',component : ActualizarAerolineaComponent},
  {path : 'crear-usuario/:id',component : CrearUsuariointerComponent},
  {path : 'detalle-Aeropuerto/:id',component : DetalleAeropuertoComponent},
  {path : 'detalle-aerolinea/:id',component : DetalleAerolineaComponent},
  {path : 'detalle-Usuario/:id',component : DetalleUsuarioInternoComponent},
  {path : 'actulizar-usuario-interno/:idaero/:id',component : ActualizarUsuariointernoComponent},
  {path : 'pantalla-principal/:id',component : PantallaTrabajadoresComponent},
  {path : 'crear-tripulacion/:id',component : CrearTripulacionComponent},
  {path : 'consultas-aerolineas/aeropuertos/:id',component : ConsultarAeropuertosComponent},
  {path : 'consultas-aerolinea/:idaero/:id',component : ConsultarAerolineasComponent},
  {path : 'consultas-Destinos/aeropuertos/:idaero/:id',component : ConsultarDAAerpuertosComponent},
  {path : 'consultas-Destinos/:id',component : ConsultarDestinosAutorizadosComponent},
  {path : 'consultas-aerolineas-aviones/:id',component : ConsultarAerolineasavionesComponent},
  {path : 'consultas-aerolineas-aviones/aviones/:idaero/:id',component : ConsultarAvionesComponent},
  {path : 'actualizar-aviones/:idaero/:id',component : ActuliazarAvionComponent},
  {path : 'crear-aviones/:id',component : CrearAvionComponent},
  {path : 'crear-vuelo/:id',component : CrearVueloComponent},
  {path : 'consultar-vuelos/:iduser',component : ConsultaVuelosUsuarioComponent},
  {path : 'consultar-vuelos/:id/:iduser',component : ConsultaVuelosUsuarioComponent},
  {path : 'consultar-vuelos',component : ConsultarVueloComponent},
  {path : 'consultar-pasajeros/:id',component : ConsultasPasajerosVueloComponent},
  {path : 'consultar-equipaje-vuelo/:id',component : ConsultarEquipajeVueloComponent},
  {path : 'consulta-vuelo/:id',component : VuelosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
