import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { moveIn, fallIn } from '../../router.animations';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent {
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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      .createUser(this.form.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/signup-success']);
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
