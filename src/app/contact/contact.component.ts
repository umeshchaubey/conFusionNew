import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Feedback,ContactType } from '../shared/feedback';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }
              
  ngOnInit(): void {
    
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now 
  
}

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength] ],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength] ],
      telnum: [0,[Validators.required, Validators.pattern] ],
      email: ['',[Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

  }

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
    'required' : 'First name required.',
    'minlength': 'First name must be atleast 2 characters long.',
    'maxlength': 'First name not be more than 25 characters long.',
    },

    'lastname':{
      'required' : 'Last name required.',
      'minlength': 'Last name must be atleast 2 characters long.',
      'maxlength': 'Last name not be more than 25 characters long.',
    },

    'telnum' : {
      'required': 'Tel.number is required.',
      'pattern' : 'Tel.number must be contain number.'
    },

    'email': {
      'required': 'Email is required.',
      'email':'Email is not in valid format.',
    },
  };

  onSubmit(){
    this.feedback= this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)){
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
