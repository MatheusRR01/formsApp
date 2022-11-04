import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
