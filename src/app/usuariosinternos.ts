export class Usuariosinternos  {
idusuariointerno: number;
documentoidentificaion: number;
nombres:string;
apellidos: string;
fechanacimiento: string;
nacionalidad: string;
correo: string;
codigopais: number;
numerotelefoono: string;
numerotelefoonoem: string;
direccion: string;
contrasenia: string;
idroles: number;
idestado: number;
usariocreacion: number;
fechacreacion: string;
fechamodicar: String;
idaeropuerto: number;
idaerolinea: number;
usuariomodi:number;

}

export interface tablaRoles {
    idroles: String;
    nombreRol : String; 
}

export interface tablaUsuarios {
    idusuariointerno: number;
    documentoidentificaion : String; 
    nombres: String;
    apellidos: String;
    nombreaeropuerto: String;
    nombreaerolinea: String;
    nombrerol: String;
    numerotelefoono: String;
}
