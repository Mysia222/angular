import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    state: string = '';
    idtaken = false;
    error: any;
    dataLoading: boolean = false;
    brokenNetwork = false;
    savedChanges = false;
    data: any;
    form: FormGroup;
    submitted = false;
    hide = true;
    private querySubscription: any;
  
    constructor(
      private userService: UserService,
      private router: Router,
      private formBuilder: FormBuilder
    ) {}
  
    routeLoginPage() {
      this.router.navigate(['/login']);
    }
  
    ngOnDestroy() {
      // this is not needed when mydata observable is used, in this case, we are registering user on subscription, this is why it's called
      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
      }
    }
    ngOnInit() {
      this.form = this.formBuilder.group({
        email: ['', [ Validators.email]],
        password: ['', Validators.required],
      });
    }
  
    get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
    }
    getErrorMessage() {
      if (this.form.value.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.form.value.email.hasError('email') ? 'Not a valid email' : '';
    }
    onSubmit() {
      this.dataLoading = true;
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.querySubscription = this.userService
        .logInUser(this.form.value)
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (error: any) => {
            this.error = error;
            this.brokenNetwork = true;
          },
          () => {
            this.error = false;
            this.dataLoading = false;
            this.brokenNetwork = false;
          }
        );
    }
}
