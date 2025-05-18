import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  // Modelo para o formulário
  formData = {
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  };

  // Método para lidar com o envio do formulário
  onSubmit(): void {
    // Aqui você pode implementar a lógica de envio do formulário
    console.log('Formulário enviado:', this.formData);
    
    // Limpa o formulário após o envio
    this.resetForm();
  }

  // Método para limpar o formulário
  resetForm(): void {
    this.formData = {
      nome: '',
      telefone: '',
      email: '',
      mensagem: ''
    };
  }
}