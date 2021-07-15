import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'phone', 'jobTitle', 'edit', 'delete'];

  constructor(private service: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.service
      .getEmployees()
      .subscribe((response: Employee[]) => (this.employees = response));
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

    //this.router.navigate(['./form'], { relativeTo: this.route });
  }
}
