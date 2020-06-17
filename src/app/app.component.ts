import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brewsss';
  kontaktForm: FormGroup;
  name: string;
  email: string;
  message: string;
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm(){
    this.kontaktForm = this.fb.group( {
      name: ['', Validators.required]
    });
  }
}
