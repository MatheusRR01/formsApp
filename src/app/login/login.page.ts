import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLinkDelegate } from '@ionic/angular';
import { Usuario } from '../models/Usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagensErro = {
    email: [{tipo: 'required', aviso:'Campo obrigatório!'}, {tipo:'email', aviso: 'Esse campo deve ser um e-mail válido!'}],
    senha: [{tipo: 'required', aviso:'Campo obrigatório!'}, {tipo:'minLength', aviso: 'Deve possuir no mínimo 6 caracteres!'}],
  };

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private route: Router) { }

  get email() {
    return this.loginForm.get('email');
  }
  get senha() {
    return this.loginForm.get('senha');
  }

  ngOnInit() {
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email').value;
      const senha = this.loginForm.get('senha').value;
      const usuario: Usuario = this.usuarioService.login(email, senha) as null as Usuario;

      if(usuario) {
        this.route.navigateByUrl('/tabs/tab1');
      } else{
        alert('E-mail ou senha inválidos!');
      }
    } else {
      alert ('Formulário Inválido');
    }
  }

}
