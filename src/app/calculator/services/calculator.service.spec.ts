
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService',()=>{
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CalculatorService);
  });

  //Creación de servicio
  it('should be created', ()=>{
    expect(service).toBeTruthy();
  });

  //Creación con valores por defecto
  it('should be created with default values', ()=>{
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  //Comprobación de borrado mediante tecla C
  it('should set resultText, subResult to "0" when C is pressed ',()=>{

    service.resultText.set('1234');
    service.subResultText.set('3254');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  })

  //Evaluamos que todos los valores que introducimos se muestren correctamente.
  it('should update resultText with number input',()=>{
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  })

  //Manejo de operadores correctamente.
  it('should handle operators correctly', () =>{
    service.constructNumber('1');
    service.constructNumber('-');

    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    expect(service.resultText()).toBe('0');
  })

   //Resultado del calculo de operaciones de suma .
   it('should calculate result correctly for addition', () =>{
    service.constructNumber('2');
    service.constructNumber('+');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  })

  //Resultado del calculo de operaciones de resta.
  it('should calculate result correctly for substraction', () =>{
    service.constructNumber('+/-');
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('3');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-5');
  })

  //Resultado del calculo de operaciones de multiplicación.
  it('should calculate result correctly for multiplication', () =>{
    service.constructNumber('+/-');
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('-4');
  })

   //Resultado del calculo de operaciones de división.
   it('should calculate result correctly for division', () =>{
    service.constructNumber('2');
    service.constructNumber('5');
    service.constructNumber('÷');
    service.constructNumber('5');
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  })

  //Resultado del calculo de operaciones de porcentaje.
  it('should calculate result correctly for division', () =>{
    service.constructNumber('1');
    service.constructNumber('5');
    service.constructNumber('0');
    service.constructNumber('0');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('5');
    service.constructNumber('%');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1875');
  })




});


