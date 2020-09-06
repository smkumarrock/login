import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from "./login-page/login-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,ReactiveFormsModule]
})
export class LoginRoutingModule { }
