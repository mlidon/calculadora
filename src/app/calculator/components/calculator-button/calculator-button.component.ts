import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl:'./calculator-button.component.css',
  host:{
    Class:'border-r border-b border-indigo-400',
    '[class.w-2/4]':'isDoubleSize()',
    '[class.w-1/4]':'!isDoubleSize()'
  }
})
export class CalculatorButtonComponent {

  public  isPressed = signal(false);
  // Output con signals
  public onClick = output<string>();
  // ViewChild nuevo
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public keyboardPressedStyle(key:string){
    //Si el contenido esta vacio no pasa nada
    if(!this.contentValue()) return;
    const value =this.contentValue()!.nativeElement.innerText;
    //Si el valor no es igual que la key pulsada no pasa nada
    if( value != key) return;
    this.isPressed.set(true);
    // se pone a true el valor y passado 100 milisegundos se vuelve a poner a false.
    setTimeout(()=>{
      this.isPressed.set(false);
    },100);
  }

  public handleClick(){
    //Si no contiene algo no se ejecuta
    if(!this.contentValue()?.nativeElement){
      return;
    }
    const value =this.contentValue()!.nativeElement.innerText;
    //Trim() evita tener espacios en blanco.
    this.onClick.emit(value.trim());
  }

  public isCommand = input(false,{
    transform:(value:boolean|string)=>
      typeof value === 'string'? value==='': value,
  });

  public isDoubleSize = input(false,{
    transform:(value:boolean|string)=>
      typeof value === 'string'? value ==='':value,
  });

  // @HostBinding('class.w-2/4') get commandStyle(){
  //   return this.isDoubleSize();
  // }



}
