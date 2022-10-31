export class Boletos {
    idboletos:number;
    idvuelo:number;
    idusuario:number;
    fechacreacion: string;
    fechamodicar: string;
    usuariocreacion: number;
    nomaletas:number;
    idestadoboleto:number;
    precio:number;
    cantidad:number;

}


export interface boletopdf{
    idboletos:number;
    nombrecliente:string;
    apellidocliente:string;
    nombreaeropuerto:string;
    destino:string;
    precio:number;
    cantidad:number;
    puertanu:number;
    fechasalida:string;
    horasalida:string;  
}

export interface maletas{
    nomaletas:number;
    nombrecliente:string;
    apellidocliente:string;
}

