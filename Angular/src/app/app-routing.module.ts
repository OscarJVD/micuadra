// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AppRouting.Module.TsRoutingModule } from './app-routing.module.ts-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     AppRouting.Module.TsRoutingModule
//   ]
// })
// export class AppRouting.Module.TsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PetsComponent } from './components/pets/pets.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full'}, // Redirección por defecto al Login
    { path: 'signin', component: SigninComponent}, // Redirección por defecto al Login
    { path: 'signup', component: SignupComponent}, // Redirección registro
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, // Redirección home - canActivate es para validar que no se pueda acceder si no se ha iniciado sesión
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]}, // Redirección tareas
    { path: 'pets', component: PetsComponent, canActivate: [AuthGuard]}, // Redirección mascotas
    { path: '**', redirectTo: 'signin'}, // Si no exite la ruta redigiere por defecto al login
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        RouterModule.forChild(routes),
        RouterModule
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }