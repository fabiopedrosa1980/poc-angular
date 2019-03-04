import { Injectable } from '@angular/core';

import { Cliente } from '../models/cliente.model';
import { ResourceService } from './base/resource.service';

@Injectable()
export class ClienteService extends ResourceService<Cliente> {

  getPath(): string {
    return '/client';
  }

}
