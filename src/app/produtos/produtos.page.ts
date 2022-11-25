import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produtosForm = this.formBuilder.group({
    nome: ['', Validators.compose([Validators.required])],
    descricao: ['', Validators.compose([Validators.required])],
    dataValidade: ['', Validators.compose([Validators.required])],
    preco: ['', Validators.compose([Validators.required])]
  });

  mensagemErro = {
    nome: [{ tipo: 'required', aviso: 'Campo obrigatório!' }],
    descricao: [{ tipo: 'required', aviso: 'Campo obrigatório!' }],
    dataValidade: [{ tipo: 'required', aviso: 'Campo obrigatório!' }],
    preco: [{ tipo: 'required', aviso: 'Campo obrigatório!' }],
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  };

  get nome() {
    return this.produtosForm.get('nome');
  }

  get descricao() {
    return this.produtosForm.get('descricao');
  }

  get dataValidade() {
    return this.produtosForm.get('dataValidade');
  }

  get preco() {
    return this.produtosForm.get('preco');
  }

}
