import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = '/api/user';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.api);
  }

  getById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.api}/${id}`);
  }

  create(user: Users): Observable<Users> {
    return this.http.post<Users>(this.api, user);
  }

  update(user: Users): Observable<any> {
    return this.http.put(`${this.api}/${user.id}`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
