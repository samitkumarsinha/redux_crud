import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]>{
    return this.http.get <User[]> (`${this.baseUrl}/users`).pipe(
      map(data => data as User[])
    );
  }
  addUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  updateUser(data: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/updateuser`, data);
  }
  delUser(id: any): Observable<any>{
    return this.http.delete(`${this.baseUrl}/deluser/${id}`);
  }
}
