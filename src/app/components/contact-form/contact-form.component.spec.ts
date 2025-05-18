import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { CommonModule } from '@angular/common';


describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let compiled: HTMLElement;

  // Configuração antes de cada teste
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ContactFormComponent],
    }).compileComponents();

    
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  // Testa se o componente foi criado com sucesso
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Testa se todos os campos do formulário estão presentes
  it('deve conter todos os campos necessários do formulário', () => {
    // Verifica se o formulário existe
    const form = compiled.querySelector('form.contact__form');
    expect(form).toBeTruthy();

    // Conta o número de inputs para verificar se estão todos presentes (nome, telefone, email)
    const inputs = form?.querySelectorAll('input');
    expect(inputs?.length).toBe(3);

    // Verifica se existe um textarea para a mensagem
    const textarea = form?.querySelector('textarea');
    expect(textarea).toBeTruthy();

    // Verifica se existe um botão de envio
    const submitButton = form?.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton?.textContent).toBe('Enviar');
  });

  // Testa a estilização básica do formulário
  it('deve aplicar as classes CSS corretas', () => {
    // Verifica se o contêiner principal tem a classe correta
    const contactContainer = compiled.querySelector('.contact');
    expect(contactContainer).toBeTruthy();

    // Verifica se o formulário tem a classe CSS correta
    const form = compiled.querySelector('.contact__form');
    expect(form).toBeTruthy();

    // Verifica se o botão tem a classe CSS correta
    const button = compiled.querySelector('.contact__form-button');
    expect(button).toBeTruthy();
  });

  // Testa a funcionalidade de submissão do formulário
  it('deve chamar o método onSubmit quando o formulário é enviado', () => {
    // Espia o método onSubmit
    const onSubmitSpy = jest.spyOn(component, 'onSubmit');

    // Obtém o formulário
    const form = compiled.querySelector('form');

    // Simula o envio do formulário
    form?.dispatchEvent(new Event('submit'));

    // Verifica se o método onSubmit foi chamado
    expect(onSubmitSpy).toHaveBeenCalled();
  });

  // Testa a funcionalidade de resetar o formulário
  it('deve limpar o formulário quando resetForm é chamado', () => {
    // Define valores iniciais para o formulário
    component.formData = {
      nome: 'Teste',
      telefone: '123456789',
      email: 'teste@example.com',
      mensagem: 'Mensagem de teste',
    };

    // Chama o método resetForm
    component.resetForm();

    // Verifica se todos os campos foram limpos
    expect(component.formData.nome).toBe('');
    expect(component.formData.telefone).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.formData.mensagem).toBe('');
  });
});
