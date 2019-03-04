import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ApiService } from './api.service';
import { Pagination } from './../../models/base/pagination.model';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class ResourceService<T> {

  protected path: String;

  constructor(
    private apiService: ApiService
  ) { }

  abstract getPath(): string;

  create(model: T): Observable<T> {
    return this.apiService.post(this.getPath(), model); 
  }

  update(model: T, id: any): Observable<T> {
    return this.apiService .put(`${this.getPath()}/${id}`, model);
  }

  delete(id: any): Observable<T> {
    return this.apiService.delete(`${this.getPath()}/${id}`);
  }

  load(id: any): Observable<T> {
    return this.apiService.get(`${this.getPath()}/${id}`);
  }

  loadAll(params: any = []): Observable<Pagination<T>> {
    if (params.page) {
      params.page--;
    }
    return this.apiService.get(this.getPath(), params).pipe(
      map(data => {
      data.number++;
      return data as Pagination<T>
    }));
    
  }

}
