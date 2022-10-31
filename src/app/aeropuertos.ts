export class Aeropuertos {
    idaeropuerto:number;
    nombreaeropuerto:string;
    nopuertas: number;
    direccion: string;
    pais: string;
    notelefono: number;
    idestado: number;
    fechacreacion: string;
    fechamodicar: string;
    idusuariocreacion: number;
    usuarioModi: number ;
}
 

export interface listaAeropuertos{
    idaeropuerto: string;
    nombreaeropuerto : string; 
}
export interface direccion{
    pais: string;
}

export interface ciudad{
    idaeropuerto: string;
    direccion: string;
}