import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm = this.fb.group({
    id: [, Validators.required],
    name: [, Validators.required],
    phone: [, Validators.required],
    jobTitle: [, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private service: EmployeeService
  ) {}

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.service
        .getEmployeeById(this.data.value.id)
        .subscribe((res: Employee) => {
          this.employeeForm.setValue({
            id: this.data.value.id,
            name: this.data.value.name,
            phone: this.data.value.phone,
            jobTitle: this.data.value.jobTitle,
          });
        });
    }
  }

  onSave() {
    if (this.data.action === 'edit') {
      this.service
        .updateEmployee(this.employeeForm.value)
        .subscribe((resp) => {});
    } else {
      this.service.addEmployee(this.employeeForm.value).subscribe((resp) => {});
    }
  }
}
