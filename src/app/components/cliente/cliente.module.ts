import { ClienteComponent } from './cliente.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/auth/auth.guard';

const clienteRouting: ModuleWithProviders = RouterModule.forChild([
    {
      path: 'cliente',
      component: ClienteComponent,
      canActivate: [AuthGuard]
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