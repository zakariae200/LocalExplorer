import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { NgChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ToolbarModule} from 'primeng/toolbar';



const appRoutes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: '', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    NgChartsModule,
    ChartModule,
    ToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ // Add CUSTOM_ELEMENTS_SCHEMA if using as custom element
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
