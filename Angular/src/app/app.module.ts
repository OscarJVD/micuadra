import { FormsModule }   from '@angular/forms'; // Módulo para forms front
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http'; // Módulo para comunicar back con front

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PetsComponent } from './components/pets/pets.component';
import { TravelsComponent } from './components/travels/travels.component';
import { TravelspgComponent } from './components/travelspg/travelspg.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuadrangularsComponent } from './components/quadrangulars/quadrangulars.component';
const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    PetsComponent,
    TravelsComponent,
    TravelspgComponent,
    FooterComponent,
    QuadrangularsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // CommonModule,
    FormsModule, // Módulo para forms front
    HttpClientModule, // Módulo para comunicar back con front
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes),
    RouterModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// export class AppRouting.Module.TsRoutingModule { }

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

