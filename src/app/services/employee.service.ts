import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeData } from '../models/employee';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private url: string = 'http://localhost:8080/employee';
  constructor(private http: HttpClient, private authService: AuthService) {}
  // private _listener: Subject<any> = new Subject<any>();

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/all`, {});
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/find/${id}`);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/update`, emp);
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}/add`, emp);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/delete/${id}`);
  }

  getEmployeePaginate(page: number, size: number): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`${this.url}/all/${page}/${size}`)
  }

  // listen(): Observable<any> {
  //   return this._listener.asObservable();
  // }

  // filter(filterBy: string) {
  //   this._listener.next(filterBy);
  // }
}
