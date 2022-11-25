import { Injectable } from '@angular/core';
import { Produtos } from '../models/Produtos.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  listaProdutos : Produtos[] = [];

  constructor(private storageService: StorageService) {}


  async salvarProduto(){
    await this.storageService.set('produtos', this.listaProdutos);
  }
}
