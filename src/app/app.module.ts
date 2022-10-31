import { NgModule, ɵɵsyntheticHostProperty } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';
import { UsuarioDetallesComponent } from './usuario-detalles/usuario-detalles.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './home/home.component';
import { ListaUsuariosInternosComponent } from './lista-usuarios-internos/lista-usuarios-internos.component';
import { ListaAeropuertoComponent } from './lista-aeropuerto/lista-aeropuerto.component';
import { IniciarSesionTrabajoComponent } from './iniciar-sesion-trabajo/iniciar-sesion-trabajo.component';
import { PantallaAdminComponent } from './pantalla-admin/pantalla-admin.component';
import { ListaAerolineasComponent } from './lista-aerolineas/lista-aerolineas.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { ActualizarAeropuertoComponent } from './actualizar-aeropuerto/actualizar-aeropuerto.component';
import { ActualizarAerolineaComponent } from './actualizar-aerolinea/actualizar-aerolinea.component';
import { CrearAerolineaComponent } from './crear-aerolinea/crear-aerolinea.component';
import { CrearUsuariointerComponent } from './crear-usuariointer/crear-usuariointer.component';
import { DetalleAeropuertoComponent } from './detalle-aeropuerto/detalle-aeropuerto.component';
import { DetalleAerolineaComponent } from './detalle-aerolinea/detalle-aerolinea.component';
import { ActualizarUsuariointernoComponent } from './actualizar-usuariointerno/actualizar-usuariointerno.component';
import { DetalleUsuarioInternoComponent } from './detalle-usuario-interno/detalle-usuario-interno.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { PantallaTrabajadoresComponent } from './pantalla-trabajadores/pantalla-trabajadores.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConsultasPasajerosVueloComponent } from './consultas-pasajeros-vuelo/consultas-pasajeros-vuelo.component';
import { CrearTripulacionComponent } from './crear-tripulacion/crear-tripulacion.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConsultarAeropuertosComponent } from './consultar-aeropuertos/consultar-aeropuertos.component';
import { ConsultarAerolineasComponent } from './consultar-aerolineas/consultar-aerolineas.component';
import { ConsultarDestinosAutorizadosComponent } from './consultar-destinos-autorizados/consultar-destinos-autorizados.component';
import { ConsultarDAAerpuertosComponent } from './consultar-d-a-aerpuertos/consultar-d-a-aerpuertos.component';
import { ConsultarAerolineasavionesComponent } from './consultar-aerolineasaviones/consultar-aerolineasaviones.component';
import { ConsultarAvionesComponent } from './consultar-aviones/consultar-aviones.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { ConsultaVuelosUsuarioComponent } from './consulta-vuelos-usuario/consulta-vuelos-usuario.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import { ActuliazarAvionComponent } from './actuliazar-avion/actuliazar-avion.component';
import { ConsultarVueloComponent } from './consultar-vuelo/consultar-vuelo.component';
import { ConsultarEquipajeVueloComponent } from './consultar-equipaje-vuelo/consultar-equipaje-vuelo.component';
import { VuelosComponent } from './vuelos/vuelos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    RegistrarUsuarioComponent,
    ActualizarUsuarioComponent,
    UsuarioDetallesComponent,
    IniciarSesionComponent,
    HomeComponent,
    ListaUsuariosInternosComponent,
    ListaAeropuertoComponent,
    IniciarSesionTrabajoComponent,
    PantallaAdminComponent,
    ListaAerolineasComponent,
    CrearAeropuertoComponent,
    ActualizarAeropuertoComponent,
    ActualizarAerolineaComponent,
    CrearAerolineaComponent,
    CrearUsuariointerComponent,
    DetalleAeropuertoComponent,
    DetalleAerolineaComponent,
    ActualizarUsuariointernoComponent,
    DetalleUsuarioInternoComponent,
    PantallaTrabajadoresComponent,
    ConsultasPasajerosVueloComponent,
    CrearTripulacionComponent,
    ConsultarAeropuertosComponent,
    ConsultarAerolineasComponent,
    ConsultarDestinosAutorizadosComponent,
    ConsultarDAAerpuertosComponent,
    ConsultarAerolineasavionesComponent,
    ConsultarAvionesComponent,
    CrearAvionComponent,
    CrearVueloComponent,
    ConsultaVuelosUsuarioComponent,
    ActuliazarAvionComponent,
    ConsultarVueloComponent,
    ConsultarEquipajeVueloComponent,
    VuelosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTableModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
