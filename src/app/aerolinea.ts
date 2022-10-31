export class Aerolinea {
    idaerolineas:number;
    nombreaerolinea: string;
    correo: string;
    codigopais: number;
    numerotelefono: number;
    idestado: number;
    idusuariocreacion: number;
    idaeropuerto:number;
    vuelos: number;
    aviones: number;
    fechacreacion: string;
    fechamodicar: string;
    usuariomodi:number;
}

export interface listaAerolinea{
    idaerolineas:number;
    nombreaerolinea:string;
}
export interface listaAerolineas{
    idaerolineas:number;
    nombreaerolinea: string;
    correo: string;
    numerotelefono: number;
    nombreaeropuerto:string;
    vuelos: number;
}
