import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

 

  getAll():Observable<any> {
    const respose =  this.http.get<any>('https://localhost:3600/api/Time');
    return respose;
  }
  
}
