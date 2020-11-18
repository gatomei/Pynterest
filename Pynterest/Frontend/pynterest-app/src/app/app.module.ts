import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token.interceptor';

function tokenGetter():any
{
  let token = localStorage.getItem("userToken");
  if(token)
  {
    return JSON.parse(token)["jwt"];
  }
  return null;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    CoreModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:[]
      },
    })
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
