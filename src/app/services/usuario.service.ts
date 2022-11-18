import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // anotações --o serviço sempre precisa estar no construtor como private 'nomeService': 'NomeService'
  listaUsuario: Usuario[] = [];

  constructor(private storageService: StorageService) { }

  // listaUsuario[usuario.id] = usuario salva o usuario na lista de usuario
  // storage.set('') salva a lista de usuario 
  async salvar(usuario: Usuario) {
    this.listaUsuario[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuario);
  };

  async buscarUm() { };

  async buscarTodos() {
    this.listaUsuario = (await this.storageService.get('usuarios')) as unknown as Usuario[];
    if (!this.listaUsuario) {
      return [];
    }
    return this.listaUsuario;
  };

  async deletar() { };

  async salvarId(id: number) {
    await this.storageService.set('idUsuario', id);
  };

  async buscarId() {
    const id = await this.storageService.get('idUsuario');
    if (!id) {
      return 0;
    }
    return id;
  };
}
