import { Component, OnInit } from '@angular/core';
import { ServiceService } from "./../../service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  sign_email: string;
  sign_psw: string;
  sign_re_psw: string;
  login_name: string;
  login_psw: string;

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  fileToUpload: File = null;
  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

  constructor(private service: ServiceService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      re_password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.registerForm.controls; }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  public SignInFun(){
    console.log(this.sign_email);
    if(this.sign_psw == this.sign_re_psw){
      var signObj = {
        mail : this.sign_email,
        password : this.sign_psw,
      }
      this.service.signupservice(signObj).subscribe(data=>{
        console.log(data);
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/detail']);
      })
    }
  }
  onSubmit(){
    if(this.registerForm.get('password').value == this.registerForm.get('re_password').value){
      const fData = new FormData();
      fData.append('file', this.fileToUpload);
      var signObj = {
        file_up : this.fileToUpload,
      };
      console.log(this.registerForm.value);
      fData.append('firstName', this.registerForm.get('firstName').value);
      fData.append('lastName', this.registerForm.get('lastName').value);
      fData.append('email', this.registerForm.get('email').value);
      fData.append('mobile', this.registerForm.get('mobile').value);
      fData.append('gender', this.registerForm.get('gender').value);
      fData.append('password', this.registerForm.get('password').value);
      console.log(signObj);
      this.service.signupservice(fData).subscribe(data=>{
        console.log(data);
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/detail']);
      })
    }
  }

  public LoginFun(){
    var loginObj = {
      name : this.login_name,
      password : this.login_psw,
    }
    this.service.loginservice(loginObj).subscribe(data=>{
      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      this.router.navigate(['/detail']);
    });
  }

}

