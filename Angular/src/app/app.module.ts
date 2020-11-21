import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // Módulo para forms front
import { HttpClientModule } from '@angular/common/http'; // Módulo para comunicar back con front

// import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule, // Módulo para forms front
    RouterModule,
    HttpClientModule // Módulo para comunicar back con front
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
