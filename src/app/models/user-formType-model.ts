import { FormControl } from '@angular/forms';

export type loginForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

export type forgotPasswordForm = {
  email: FormControl<string | null>;
};

export type resetPasswordForm = {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export type registrationForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export type userEditForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  employeeId: FormControl<string | null>;
  manager:FormControl<string | null>;
  title: FormControl<string | null>;
  department: FormControl<string | null>;
  profileText: FormControl<string | null>;
  whyIVolunteer: FormControl<string | null>;
  city:FormControl<string | null>;
  country:FormControl<string | null>;
  availablity:FormControl<string | null>;
  linkedInUrl: FormControl<string | null>;
};
