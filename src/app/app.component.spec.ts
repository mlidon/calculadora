import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  //Creamos dos variabeles que utilizamos en todas las pruebas
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app:AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    //Las inicializamos una vez se cargue el componente.
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it("shoud be 3",()=>{
    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // A = Act
    const result = num1+ num2;

    // A = Assert Afirmación
    expect(result).toBe(3)
  })


  it(`should have the 'calculadora' title`, () => {
    expect(app.title).toEqual('calculadora');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes',()=>{

    //Guardamos el primer selector div del componente
    const divElement = compiled.querySelector('div')
    //Guardamos las clases que debe tener el div
    const mustHaveClasses ='min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    const divClasses = divElement?.classList.value;

    //Comprobamos que no este vacio.
    expect(divElement).not.toBeNull();
    //Recorremos las clases para asegurarnos que contenga las clases.
    mustHaveClasses.forEach(className => {
        expect( divClasses ).toContain(className);
    });

  });

  it("should containt the 'buy me a beer' link", ()=>{
    const anchorElement = compiled.querySelector('a')
    const anchorTitle = anchorElement?.title;
    const anchorHref = anchorElement?.getAttribute('href');

    expect(anchorElement).not.toBeNull();
    expect(anchorTitle).toBe('Buy me a beer');
    expect(anchorHref).toContain('https://www.buymeacoffee.com/scottwindon')
  });

});
