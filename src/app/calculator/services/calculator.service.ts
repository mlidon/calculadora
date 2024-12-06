import { Injectable, signal } from '@angular/core';

const numbers =  ['0','1','2','3','4','5','6','7','8','9'];
const operators =  ['+','-','/','÷','*','x'];
const specialOperators =[  '+/-','%','=','.','C','Backspace']


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value:string):void{

    console.log("Service",value);

    // Validar input
    if(![...numbers, ...operators, ...specialOperators].includes(value)){
      return;
    }

    //Calcular resultado
    if(value == "="){
      // TODO
      this.calculateResult();
      console.log('Calcular resultado');
      return;
    }

    if(value == "%"){
      const valorBase = parseFloat(this.subResultText());
      const porcentaje = parseFloat(this.resultText())/100;
      let incremento = valorBase * porcentaje;
      let result:any;

      switch(this.lastOperator()){
        case '+':
          incremento = valorBase* porcentaje;
          result = valorBase + incremento;
          break;
        case '-':
          result = valorBase - incremento;
          break;
        case '*':
          result = valorBase * incremento;
          break;
        case 'x':
          result = valorBase * incremento;
          break;
        case '/':
          result =valorBase / incremento;
          break;
        case '÷':
          result = valorBase / incremento;
          break;
      }
      this.resultText.set(result.toString());
      this.subResultText.set('0');
    }

    //Limpiar resultado
    if(value === 'C'){
      console.log('Borro');

      this.resultText.set('0') //= signal('0');
      this.subResultText.set('0')// = signal('0');
      this.lastOperator.set('+')// = signal('+');
      return;
    }

    // BackSpace
    // TODO revisar cunado tengamos un valor negativo.
    if(value ==='Backspace'){
      if(this.resultText() === '0') return;

      if(this.resultText().includes('-') && this.resultText().length === 2){
        this.resultText.set('0');
        return
      };

      if(this.resultText().length === 1){
        this.resultText.set('0');
        return;
      }

      this.resultText.update(v=> v.slice(0,-1))
      return;
    }

    //Aplicar operadores
    if(operators.includes(value)){
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //limitar numero de caracteres
    if(this.resultText().length>=9){
      console.log('Max length reached');
      return ;

    }

    //Validar punto decimal
    if(value === '.' && !this.resultText().includes('.')){
       if(this.resultText() ==='0'|| this.resultText() ===''){
        this.resultText.set('0.')
        return;
       }
       this.resultText.update((text) => text + '.');
       return;
    }

    //Manejo de el cero inicial
    if( value === '0' && (this.resultText() === "0" || this.resultText() === "-0")){

      return;
    }

    // Cambiar signo
    if(value === '+/-'){
      if(this.resultText().includes('-')){
        this.resultText.update((text)=> text.slice(1));
        return;
      }
      this.resultText.update((text) => '-'+ text);
      return;
    }

    //Numeros
    if(numbers.includes(value)){
      if(this.resultText() === "0" ){
        this.resultText.set(value);
        return;
      }

      if(this.resultText() === "-0"){
        this.resultText.set("-" + value);
        return;
      }

      this.resultText.update((text) => text + value);
      return;
    }

  }

  //Esta función es llamada en el momento que tocamos el igual.
  public calculateResult(){
    //Obtener los valores
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());


    let result = 0

    // Realizar las operaciones
    switch(this.lastOperator()){
      case '+':
        result = number1 + number2
        break;
      case '-':
        result = number1 - number2
        break;
      case '*':
        result = number1 * number2
        break;
      case 'x':
        result = number1 * number2
        break;
      case '/':
        result = number1 / number2
        break;
      case '÷':
        result = number1 / number2
        break;
      case '%':
        console.log(this.subResultText());
        console.log(this.resultText());
        console.log( this.resultText());



    }
    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }

}




