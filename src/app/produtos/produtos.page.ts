import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produtos } from '../models/Produtos.model';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produto: Produtos = new Produtos();

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

  constructor(private formBuilder: FormBuilder, private route: Router, private produtoService: ProdutosService) { }

  async salvarProduto(){
    if (this.produtosForm.valid) {
      this.produto.nome = this.produtosForm.get('nome').value;
      this.produto.descricao = this.produtosForm.get('descricao').value;
      this.produto.dataValidade = this.produtosForm.get('dataValidade').value;
      this.produto.preco = this.produtosForm.get('preco').value;

      const id = await this.produtoService.buscarId() as number;

      this.produto.id = id;

      this.produtoService.salvarProduto(this.produto);

      this.produtoService.salvarId(id + 1);
      alert('Produto cadastrado com sucesso!');
    } else {
      alert('Formulário inválido');
    }
  }

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
