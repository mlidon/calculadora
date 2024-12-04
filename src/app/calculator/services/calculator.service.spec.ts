
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

});


