import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Pagination } from 'src/app/shared/models/base/pagination.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceLoader } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  clienteForm: FormGroup;
  submitted = false;
  id: number;
  cliente: Cliente;
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
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadClients();
    this.clienteForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  get fullName() { return this.clienteForm.get('fullName'); }
  get email() { return this.clienteForm.get('email'); }
  get telephone() { return this.clienteForm.get('telephone'); }
  get gender() { return this.clienteForm.get('gender'); }

  cancel(cleanMessage: boolean){
    this.id = null;
    this.clienteForm.reset();
    this.submitted = false;
    if(cleanMessage){
      this.message = null;
    }  
  }

  reloadPage(msg: string, css: string){
    this.cssClass = css        
    this.message = msg;
    this.loadClients();
    setTimeout(()=>{ 
      this.message = null;
    }, 3000);
  }
  
  loadClient(id: number){
    this.message = null;
    this.id = id;
    this.clienteService.load(id).subscribe(cliente =>  this.updateValues(cliente));
  }

  updateValues(cliente: Cliente) {
    this.clienteForm.setValue({
      fullName: cliente.nome,
      email: cliente.email,
      telephone: cliente.telefone,
      gender: cliente.sexo
    });
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
    this.submitted = true;
    if (this.clienteForm.invalid) {
      return;
    }
    this.buildClient(null);
    this.clienteService.create(this.cliente)
      .subscribe(
        cliente => { 
          this.reloadPage('Cliente inserido com sucesso','alert alert-success');
          this.cancel(false);
        },
        error => {
          this.errors = error.fieldErrors
        }
    );
  }

  buildClient(id: number){
    this.cliente = new Cliente(id,this.clienteForm.value.fullName,this.clienteForm.value.email,this.clienteForm.value.telephone,this.clienteForm.value.gender);
  }
  
  updateClient(){
    this.submitted = true;
    if (this.clienteForm.invalid) {
      return;
    }
    this.buildClient(this.id);
    this.clienteService.update(this.cliente,this.id)
      .subscribe(
        cliente => {        
          this.reloadPage('Cliente alterado com sucesso','alert alert-success');
          this.cancel(false);
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
        this.reloadPage('Cliente excluido com sucesso','alert alert-success');
        this.cancel(false);
      },
      error => {
        this.errors = error.fieldErrors
      }
    );
  }
  
}
