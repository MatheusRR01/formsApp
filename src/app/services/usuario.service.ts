import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // anotações --o serviço sempre precisa estar no construtor como private 'nomeService': 'NomeService'
  listaUsuario: Usuario[] = [];

  constructor(private storageService: StorageService) {}

  async login(email: string, senha: string){
    this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuario.filter(item => {
      if(item.email.toLocaleLowerCase() == email.toLocaleLowerCase()){
        usuario = item;
      }
    });
    if(usuario?.senha === senha){
      return usuario;
    }

    return null;
  }

  // listaUsuario[usuario.id] = usuario salva o usuario na lista de usuario
  // storage.set('') salva a lista de usuario 
  async salvar(usuario: Usuario) {
    this.listaUsuario[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuario);
  };

  async buscarUm(id: number) {
    this.buscarTodos();
    return this.listaUsuario[id];
  };

  async buscarTodos() {
    this.listaUsuario = (await this.storageService.get('usuarios')) as unknown as Usuario[];
    if (!this.listaUsuario) {
      return [];
    }
    return this.listaUsuario;
  };

  async deletar(id: number) {
    this.buscarTodos(); // atualiza a lista de Usuarios
    this.listaUsuario.slice(id, 1); // remove o usuario do array
    await this.storageService.set('usuarios', this.listaUsuario); //salva o array
  };

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
