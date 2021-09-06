import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeData } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: EmployeeData | any
  displayedColumns: string[] = ['name', 'phone', 'jobTitle', 'edit', 'delete'];


  constructor(private service: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.service
      .getEmployeePaginate(0,10)
      .subscribe((response: EmployeeData) => (this.employees = response));
  }

  editClick(emp: Employee) {
    // console.log('ID :', emp.id);
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: { action: 'edit', value: emp },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getEmployees();
    });
  }

  deleteClick(emp: Employee) {
    this.service.deleteEmployee(emp.id).subscribe((res) => this.getEmployees());
  }

  addClick() {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      data: {
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getEmployees();
    });


  }

  onPageChange(event: PageEvent) {
    let page = event.pageIndex
    let size = event.pageSize
    this.service
      .getEmployeePaginate(page,size)
      .subscribe((response: EmployeeData) => (this.employees = response));
  }
}
