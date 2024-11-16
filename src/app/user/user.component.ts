import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Customvalidators } from '../shared/custom.validators';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  employeeForm!: FormGroup

  validationMessage: {
    [key: string]: {
      required?: string;
      minlength?: string;
      maxlength?: string;
      emailDomain?: string;
    };
  } = {
      'fullName': {
        'required': 'Full name is required.',
        'minlength': 'Full Name must be greater than 2 characters',
        'maxlength': 'Full Name must be less than 10 characters'
      },
      'email': {
        'required': 'Email is Required.',
        'emailDomain': 'Email domain should be gmail.com',
      },
      'confirmEmail': {
        'required': 'Confirm Email is Required.',
      },
      'emailGroup': {
        'required': 'Email and Confirm Email do not match.',
      },
    };

  formErrors: { [key: string]: string } = {
  };

  constructor(private fb: FormBuilder) {
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }
  // ngOnInit() {
  //   this.employeeForm = new FormGroup({
  //     fullName: new FormControl(),
  //       email: new FormControl(),
  //       skills: new FormGroup({
  //         skillName:new FormControl(),
  //         experienceInYears:new FormControl(),
  //         proficiency:new FormControl()
  //       })
  //   });

  // }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Customvalidators.emailDomain]],
        confirmEmail: ['', Validators.required],
      }, { Validators: matchEmail }),
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

  addSkillButtonClick() {
    const skillsArray = this.employeeForm.get('skills') as FormArray;
    skillsArray.push(this.addSkillFormGroup());
  }

  
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const message = this.validationMessage[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey && message) {
            const errorMessage = message[errorKey as keyof typeof message];
            if (errorMessage) {
              this.formErrors[key] += errorMessage + ' ';
            }
          }
        }
      }

      if (abstractControl instanceof FormGroup) {      //Handle nested form group  section 
        this.logValidationErrors(abstractControl);
      }
    });
  }
  onLoadDataClick() {

    const formArray1 = new FormArray([
      new FormControl('Jpohn', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required)
    ]);

    const formGroup = new FormGroup([
      new FormControl('Jpohn', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required)
    ]);
    console.log(formArray1);
    console.log(formGroup);
    // this.logValidationErrors(this.employeeForm)
    // console.log(this.formErrors);
  }

  onSubmit() {
    // Log the form values to the console
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].touched);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl?.value === confirmEmailControl?.value || confirmEmailControl?.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };  
  }
}