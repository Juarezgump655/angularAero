export class Tripulacion {
    idtripulacion:number;
    idaeropuerto:number;
    idpiloto:number;
    idcopiloto:number;
    idingeniero:number;
    idtripulantes1:number;
    idtripulantes2:number;
    idtripulantes3:number;
    idaerolinea:number;
    idestado:number;
    idavion:string;
    fechacreacion:string;
    fechamodicar:string;
    idusuariocreacion:number;
}

export interface tripulaciontable {
    idtripulacion:number;
    nombres:String;
    nombrecopi:String;
    nombresInge:String;
    nombresTripu:String;
    nombreTripu2:String;
    nombreTripu3:String;
}