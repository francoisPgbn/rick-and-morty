import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { EpisodeModule } from './features/episode/episode.module';
import { HomeModule } from './features/home/home.module';
import { CharacterModule } from './features/character/character.module';
import { LocationModule } from './features/location/location.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([]),
    NgxsReduxDevtoolsPluginModule.forRoot({}),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    CharacterModule,
    EpisodeModule,
    LocationModule,
    HomeModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
