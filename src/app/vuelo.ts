export class Vuelo {
    idvuelo:number;
    idaeropuerto:number;
    idestino:number;
    idaerolinea:number;
    idestado:number;
    idavion:number;
    precioeconomico:number;
    precioejecutivo:number;
    puertabordaje:number;
    fechasalida:string;
    fechallegada:string;
    fechacreacion:string;
    fechamodicar:string;
    idusuariocreacion:number;
    idestadovuelo:number;
    id_tripu:number;
    horasalida: string;
    horallegada:string;
}

export interface vuelotable{
    idvuelo:number;
    idavion:number;
    fechallegada: string;
    horasalida: string,
    horallegada: string,
    precioeconomico: number,
    precioejecutivo: number,
    fechaSalida: string,
    destino: string,
    salida: string
}

export interface vueloPasajeros{
    idvuelo:number;
    asiento:number;
    numeropasaporte: number;
    nombrecliente: string,
    apellidocliente: string,
    nacionalidad: number,
    numerotelefoono: number,
    correo: string,
}


export interface vueloconsulta{
    idvuelo:number;
    modelo:string;
    marca:string;
    nombreaerolinea:string;
    fechasalida:string;
    fechallegada:string;
    destino:string;
    horasalida: string;
    salida: string;
    horallegada: string;
}