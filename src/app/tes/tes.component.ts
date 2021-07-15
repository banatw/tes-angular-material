import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EmployeeFormComponent } from '../employee/employee-form/employee-form.component';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { TesDataSource, TesItem } from './tes-datasource';

@Component({
  selector: 'app-tes',
  templateUrl: './tes.component.html',
  styleUrls: ['./tes.component.css'],
})
export class TesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TesItem>;
  dataSource: TesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'phone', 'edit', 'delete'];

  constructor(private service: EmployeeService, private dialog: MatDialog) {
    this.dataSource = new TesDataSource();
  }
  ngOnInit(): void {
    this.getEmployees();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.getEmployees();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getEmployees() {
    this.service.getEmployees().subscribe((res: Employee[]) => {
      this.dataSource.disconnect();
      this.dataSource.data = res;
      this.dataSource.connect();
      this.table.dataSource = this.dataSource;
    });
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
}
