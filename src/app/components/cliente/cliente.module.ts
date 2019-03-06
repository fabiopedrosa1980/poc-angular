import { ClienteComponent } from './cliente.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

const clienteRouting: ModuleWithProviders = RouterModule.forChild([
    {
      path: 'cliente',
      component: ClienteComponent
    },
    {
      path: 'cliente/edit/:id',
      component: ClienteComponent,
    }
  ]);
  
  @NgModule({
    imports: [
      CommonModule,
      SharedModule,    
      clienteRouting,
      ReactiveFormsModule
    ],
    declarations: [ClienteComponent]    
  })
  export class ClienteModule { }