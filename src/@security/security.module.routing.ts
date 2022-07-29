import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, },
    { path: 'register', component: RegisterComponent, },
    { path: 'forget', component: ForgetComponent, },
    { path: '**', redirectTo: 'login', },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule {
}