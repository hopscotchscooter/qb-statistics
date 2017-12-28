import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, DropdownModule, InputTextModule, ButtonModule, DataListModule } from 'primeng/primeng';
import { LoadersCssModule } from 'angular2-loaders-css';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app-component/app.component';
import { MainComponent } from './components/main-component/main-component';
import { StandingsComponent } from './components/standings-component/standings-component';
import { QuarterbacksComponent } from './components/quarterbacks-component/quarterbacks-component';
import { StatsService } from './services/stats-service';

const appRoutes: Routes = [
    { path: 'quarterbacks', component: QuarterbacksComponent },
    { path: 'standings', component: StandingsComponent },
    { path: '', component: MainComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    QuarterbacksComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DropdownModule,
    ButtonModule,
    DataListModule,
    SharedModule,
    InputTextModule,
    LoadersCssModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    )
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
