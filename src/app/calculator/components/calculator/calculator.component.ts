import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  private calculatorService = inject(CalculatorService)

  public resultText = computed(()=> this.calculatorService.resultText());
  public subResultText = computed(()=> this.calculatorService.subResultText());
  public lastOperator = computed(()=> this.calculatorService.lastOperator());

  handleClick(key:string){
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event:KeyboardEvent){
    // tabla de equivalencias.
    const keyEquivalents:Record <string,string> ={
      Escape: 'C',
      Clear:'C',
      "_":'+/-',
      '%': '%',
      '÷': '/',
      'x':'*',
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


