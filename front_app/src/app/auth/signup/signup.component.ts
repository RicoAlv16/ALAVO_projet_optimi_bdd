import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public signupForm: FormGroup;

  private fb = inject(FormBuilder);

  constructor() {
    this.signupForm = this.fb.group({
      privacy: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });
  }
  ngOnInit(): void {
    this.signupForm.patchValue(this.signupForm.value);
  }
}
