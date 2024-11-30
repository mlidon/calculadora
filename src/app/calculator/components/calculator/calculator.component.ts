import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '(document:keyup)':'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  public calculatorButtons = viewChildren(CalculatorButtonComponent)

  handleClick(key:string){
    console.log({key});
  }
  // @HostListener('document:keyup',['$event'])
  handleKeyboardEvent(event:KeyboardEvent){
    // tabla de equivalencias.
    const keyEquivalents:Record <string,string> ={
      Escape: 'C',
      Clear:'C',
      "_":'+/-',
      '%': '%',
      '/': '÷',
      '*':'x',
      '-':'-',
      '+':'+',
      Enter:'='
    }

    const key = event.key
    const keyValue = keyEquivalents[key]?? key;
    this.handleClick(key)
    this.calculatorButtons().forEach((button)=>{
      button.keyboardPressedStyle(keyValue);
    })
  }


}
