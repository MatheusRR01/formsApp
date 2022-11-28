import { Injectable } from '@angular/core';
import { Produtos } from '../models/Produtos.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  listaProdutos : Produtos[] = [];

  constructor(private storageService: StorageService) {}


  async salvarProduto(produto: Produtos){
    await this.buscarTodos();
    this.listaProdutos[produto.id] = produto;
    await this.storageService.set('produto', this.listaProdutos);
  }

  async buscarTodos() {
    this.listaProdutos = (await this.storageService.get('usuarios')) as unknown as Produtos[];
    if (!this.listaProdutos) {
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  };

  async salvarId(id: number) {
    await this.storageService.set('idProduto', id);
  };

  async buscarId() {
    const id = await this.storageService.get('idProduto');
    if (!id) {
      return 0;
    }
    return id;
  };
}
