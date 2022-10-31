import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ciudad, listaAeropuertos } from '../aeropuertos';
import { AeropuertosService } from '../aeropuertos.service';
import { asientos } from '../asiento';
import { AsientoService } from '../asiento.service';
import { Avion } from '../avion';
import { AvionService } from '../avion.service';
import { boletopdf, Boletos } from '../boletos';
import { BoletosService } from '../boletos.service';
import { Vuelo, vuelotable } from '../vuelo';
import { VueloService } from '../vuelo.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-consulta-vuelos-usuario',
  templateUrl: './consulta-vuelos-usuario.component.html',
  styleUrls: ['./consulta-vuelos-usuario.component.css']
})
export class ConsultaVuelosUsuarioComponent implements OnInit {
  ListaCiudades: ciudad[];
  ListaAsientos: asientos[];
  asiento: number[][] = new Array;
  numeroasientos: number;
  resultado: number;
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  tamanio: boolean = false;
  vuelo: boolean = false;
  listavuelo: vuelotable[] = [];
  listaaviones: Avion[];
  clasesdevuelo: number[];
  idavio: number;
  cantidadAsientos: number;
  asientoslist: number[];
  numeroid: number;
  colorasiento:true;
  iduser:number;
  fecha:string;
  idaero:number;
  value:  string = "";
  idVuelo:number;
  vueloid:number;
  vuelonumber:number;
  claselist:any[] = [];
   boleto: boletopdf;
   idboleto:number;
  constructor( private boletoServicio:BoletosService,private router: Router,private route:ActivatedRoute,private avionServicio: AvionService, private vueloServicio: VueloService, private aeropuertoServicio: AeropuertosService, private asientosServicio: AsientoService) { }
  formulariobeta = new FormGroup({
    fechasalida: new FormControl(),
    idaeropuerto: new FormControl(),

  });
/*   fromularioBoleto = new FormGroup({
    maletas: new FormControl(),
    clase: new FormControl(),

  }); */

  formularioAsientos = new FormGroup({
    noAsientos: new FormControl(),
     maletas: new FormControl(),
    clase: new FormControl(),

  });

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['iduser'];
    this.idVuelo =this.route.snapshot.params['id'];
    if(this.idVuelo != undefined){
      this.traervuelo2(this.idVuelo)
    }
    this.asientoslist = [];
    this.traerCiudad();
    this.traerAvion();
    if (this.idavio != undefined) {
      this.traerAsietno(this.idavio);
    }
  }


  seleccionar(id: number) {
    console.log(id)
    if (this.asientoslist.includes(id)) {
      console.log(this.asientoslist, "llego al includes")
      this.borrarasiento(id)
    } else {
      this.asientoslist.push(id);
      console.log(this.asientoslist, "llego al final")
    } 
  }

  reservar(){

    if(this.asientoslist.length < this.formularioAsientos.get("noAsientos")?.value){
      swal('ERROR', `Debe seleccionar la cantidad completa de asientos que solicito` , `error`)
    }else if(this.asientoslist.length == this.formularioAsientos.get("noAsientos")?.value){
      for (let index = 0; index <   this.asientoslist.length; index++) {
        const element =   this.asientoslist[index];
        console.log(element)
        console.log(this.iduser)
         this.asientosServicio.reservarAsiento(this.iduser,element).subscribe(dato => {
          swal('Se asigno el Asiento', `Ha seleccionado de manera correcta el asiento: ` + element, `success`)
          this.traerAsietno(this.vuelonumber);
        }, error => swal('Se asigno el Asiento', `Ha seleccionado de manera correcta el asiento: ` + element, `error`)) 
      } 
      let fecha = new Date();
      let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
      const boleto:Boletos={
        idboletos: 0,
        idvuelo: this.vuelonumber,
        idusuario: this.iduser,
        fechacreacion: desdeStr,
        fechamodicar: desdeStr,
        usuariocreacion: this.iduser,
        nomaletas:this.formularioAsientos.get("maletas")?.value,
        idestadoboleto: 1,
        precio: this.formularioAsientos.get("clase")?.value,
        cantidad: this.asientoslist.length
      }
      this.crearboleto(boleto);


    
    }else{
      swal('ERROR', `Debe seleccionar la cantidad de asientos que solicito` , `error`)
    }


  }


  filtro() {
    this.traerVuelo();

  }

  Home(){
    this.router.navigate(['/home']);
  }



  traerCiudad() {
    this.aeropuertoServicio.traerCiudades().subscribe(dato => {
      this.ListaCiudades = dato;
    })
  }

  traerAvion() {
    this.avionServicio.obtenerListaDeAeropuerto().subscribe(dato => {
      this.listaaviones = dato
    })
  }


  borrarasiento(id:number){
    let index = this.asientoslist.findIndex(e => e === id);
    if(index !== -1){
      this.asientoslist.splice(index, 1)
      console.log(this.asientoslist,"llego aqui")
    }else{
      console.log(id,"llego aqui")
    }
   
  }

  traerAsietno(id: number) {

    this.cantidadAsientos = this.formularioAsientos.get("noAsientos")?.value;
    if (this.cantidadAsientos == null, this.formularioAsientos.get("maletas")?.value == null,this.formularioAsientos.get("clase")?.value == null ) {
      console.log(this.cantidadAsientos)
      swal('ERROR', `Debe llenar los campos`, `error`)

      this.vuelo = false;
    } else {
      this.idavio = id;
      this.asientosServicio.traerAsientosA(id).subscribe(dato => {
        this.ListaAsientos = dato;
        if (this.cantidadAsientos > this.ListaAsientos.length) {
          swal('ERROR', `Los asientos que desean es mayor al numero del avion `, `error`)
          this.vuelo = false;
        } else[
          this.vuelo = true
        ]


        if (this.ListaAsientos.length <= 250) {
          this.numeroasientos = 4;
          console.log("El avion es menor a 250 se dividira en : ", this.numeroasientos, " columnas")
          this.displayedColumns = ['A', 'B', 'C', 'D'];
          this.tamanio = false;
        } else {
          this.numeroasientos = 6;
          console.log("El avion es mayor a 251 se dividira en : ", this.numeroasientos, " columnas")
          this.displayedColumns = ['A', 'B', 'C', 'D', 'E', 'F'];
          this.tamanio = true;
        }

        const asientos = []
        var iterador = 0;
        for (let f = 0; f < (this.ListaAsientos.length / this.numeroasientos); f++) {

          //el asiento en la f sera un asientos con datos vacio
          asientos[f] = {}

          for (let c = 0; c < this.numeroasientos; c++) {
            asientos[f][c] = this.ListaAsientos[iterador]
            asientos[f][c] = this.ListaAsientos[iterador] ? this.ListaAsientos[iterador] : undefined
            iterador++;
          }
        }

        this.dataSource.data = asientos;
        console.log(asientos);
      })
    }



  }

  traervuelo2(id:number){
  this.vueloServicio.obtenerVueloporID(id).subscribe(dato =>{
    console.log(id)
     this.claselist.push(dato.precioeconomico);
     this.claselist.push(dato.precioejecutivo);
    this.listavuelo.push(dato)
  })    
  }

  traerVuelo() {
      this.fecha = this.formulariobeta.get("fechasalida")?.value
    this.idaero=  this.formulariobeta.get("idaeropuerto")?.value

    if(this.fecha == null && this.idaero== null){
      swal('ERROR', `Debe de llenar los campos  `, `error`)
    }else{
      this.vueloServicio.obtenerListavuelosFiltro(this.fecha , this.idaero).subscribe(dato => {
        this.listavuelo = dato;
        this.claselist = [];

        if(this.listavuelo.length ==0){
          swal('Informacion', `No hay vuelos con los parametros ingresados `, `info`)
        }else{
          this.vuelo = false;
          console.log(dato)
        }
      })
    }
  
  }

  seleccionarAvion(id: number, idavuelo: number) {
    this.asientoslist = []
    this.vuelonumber= id;
    this.traerAsietno(id);
    console.log(this.idVuelo )
  }


  crearboleto(boletos? : Boletos){
    this.boletoServicio.crearBoleto(boletos!).toPromise().then(dato =>{
      this.asientoslist = []
        this.idboleto= dato.idboletos;
      this.boletoServicio.findById(this.idboleto).subscribe(dato =>{
        this.boleto = dato
        this.generarTicket();
      })
    }, error => swal('ERROR', `Error al crear el boleto `, `error`))
  
  }

  
generarTicket() {
  const pdfDefinition: any ={
    content: [
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                border: [true, true, true, false],
                style: 'tableExample',
                table: {
                  widths: [450, '*'],
                  body: [
                    [
                     /*   {
                        width: 150,
                        margin: [0, 15, 0, 0],
                        border: [false, false, false, false]
                      },

                      {
                        width: 50,
                        border: [false, false, false, false]
                      }  */
                    ]
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, false],
                table: {
                  widths: [115, 115, 115, 115],
                  body: [
                    [
                      { text: 'No. Boleto', bold: true, border: [false, false, false, false] },
                      { text: 'En puerta', bold: true, border: [false, false, false, false] },
                      { text: 'No. Asientos', bold: true, border: [false, false, false, false] }
                    ],
                    [
                      { text: this.boleto.idboletos , border: [false, false, false, false] },
                      { text: this.boleto.puertanu , border: [false, false, false, false] },
                      { text: this.boleto.cantidad, border: [false, false, false, false] }
                    ]
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, false],
                table: {
                  widths: [118, '*'],
                  body: [
                    [
                      { text: 'Nombre: ', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.nombrecliente +" "+ this.boleto.apellidocliente, border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, false],
                table: {
                  widths: [118, '*'],

                  body: [
                    [
                      { text: 'Origen:', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.nombreaeropuerto, border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',

                border: [true, false, true, false],
                table: {
                  widths: [118, '*'],
                  body: [
                    [
                      { text: 'Destino: ', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.destino, border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, false],
                table: {
                  widths: [118, '*'],

                  body: [
                    [
                      { text: 'Fecha de salida:', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.fechasalida.toString(), border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, false],
                table: {
                  widths: [118, '*'],
                  body: [
                    [
                      { text: 'Hora de salida:', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.horasalida, border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
            [
              {
                style: 'tableExample',
                border: [true, false, true, true],
                table: {
                  widths: [118, '*'],

                  body: [
                    [
                      { text: 'Precio:', bold: true, border: [false, false, false, false] },
                      { text: this.boleto.precio, border: [false, false, false, false] },
                    ],
                  ]
                }
              }
            ],
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 0],
        fontSize: 15,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    pageSize: 'A5',
    pageOrientation: 'landscape',
    pageMargins: [20, 45, 20, 20]

  }
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.download();
}


}
