import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pagination } from 'src/app/shared/models/base/pagination.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  id: number;
  cliente: Cliente = new Cliente;
  pagination: Pagination<Cliente>;
  errors: Object = {};
  message: string;
  cssClass: string;
  alerts: any = [];
  filters: any = {
    name: '',
    page: 0,
    sort: 'nome',
    size: 10
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.loadClients();
  }

  cancel(){
    console.info("load cliente");
    this.id = null;
    this.cliente.nome = null;
    this.cliente.email = null;
    this.cliente.sexo = null;
    this.cliente.telefone = null;  
  }
  loadClient(id: number){
    console.info("load cliente");
    this.id = id;
    this.clienteService.load(id).subscribe(cliente => this.cliente = cliente);
  }
  
  loadClients(page: number = 0) {    
    this.filters.page = page;
    this.clienteService
      .loadAll(this.filters)
      .subscribe(
        pagination => this.pagination = pagination,
        error => this.message =  error.message
      );      
  }

  pageChanged(event: any) {
    this.loadClients(event.page);
  }

  saveClient(){
    console.info("save");
    this.clienteService.create(this.cliente)
    .subscribe(
      cliente => { 
        this.cssClass = 'alert alert-success';        
        this.message = 'Cliente inserido com sucesso';
        this.loadClients();
      },
      error => {
        this.errors = error.fieldErrors
      }
    );
  }
  
  updateClient(){
    console.info("update");
    this.clienteService.update(this.cliente,this.id)
    .subscribe(
      cliente => {        
        this.cssClass = 'alert alert-success';        
        this.message = 'Cliente alterado com sucesso';
        this.loadClients();
      },
      error => {
        this.errors = error.fieldErrors
      }
    );
  }

  deleteClient(id: number){
    this.clienteService.delete(id)
    .subscribe(
      cliente => {
        this.cssClass = 'alert alert-success';        
        this.message = 'Cliente excluido com sucesso';
        this.loadClients();
      },
      error => {
        this.errors = error.fieldErrors
      }
    );
  }
  
}
