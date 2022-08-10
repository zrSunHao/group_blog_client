import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { LayoutModule } from 'src/@layout/layout.module';
import { AuthGuard } from 'src/@shared/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
