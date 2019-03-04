import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ApiService } from './services/base/api.service';
import { ClienteService } from './services/cliente.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule    
  ],
  declarations: [
  ],
  exports: [
    HttpClientModule, 
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    PaginationModule,
    ModalModule,
    AlertModule,
  ],
  providers: [
    ApiService,
    ClienteService
  ]
})
export class SharedModule { }
