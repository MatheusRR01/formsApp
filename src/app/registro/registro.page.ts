import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();

  registroForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required])],
    cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmarsenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagemErro = {
    nome: [{ tipo: 'required', aviso: 'Campo obrigatório!' }],
    cpf: [{ tipo: 'required', aviso: 'Campo obrigatório!' }, { tipo: 'minLength', aviso: 'Deve possuir no mínimo 11 caracteres!' }, { tipo: 'maxLength', aviso: 'Deve possuir no máximo 11 caracteres!' }],
    email: [{ tipo: 'required', aviso: 'Campo obrigatório!' }, { tipo: 'email', aviso: 'Esse campo deve ser um e-mail válido!' }],
    senha: [{ tipo: 'required', aviso: 'Campo obrigatório!' }, { tipo: 'minLength', aviso: 'Deve possuir no mínimo 6 caracteres!' }],
    confirmarsenha: [{ tipo: 'required', aviso: 'Campo obrigatório!' }, { tipo: 'minLength', aviso: 'Deve possuir no mínimo 6 caracteres!' }]
  };

  constructor(private formBuilder: FormBuilder, private bd: StorageService, private usuarioService: UsuarioService, private route: Router) { }

  async salvar() {
    if (this.registroForm.valid) {
      this.usuario.nome = this.registroForm.get('nome').value;
      this.usuario.email = this.registroForm.get('email').value;
      this.usuario.cpf = this.registroForm.get('cpf').value;
      this.usuario.senha = this.registroForm.get('senha').value;

      const id = await this.usuarioService.buscarId() as number;

      this.usuario.id = id;

      this.usuarioService.salvar(this.usuario);

      this.usuarioService.salvarId(id + 1);
      alert('Sucesso!');
      this.route.navigateByUrl('/login');
    } else {
      alert('Formulário inválido');
    }
  };
  get nome() {
    return this.registroForm.get('nome');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get cpf() {
    return this.registroForm.get('cpf');
  }

  get senha() {
    return this.registroForm.get('senha');
  }

  get confirmarsenha() {
    return this.registroForm.get('confirmarsenha');
  }

  pVoltar(){
    this.route.navigateByUrl('/login');
  }

  ngOnInit() {
  }
}
