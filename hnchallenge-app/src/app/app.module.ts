import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Provider } from '@angular/core';
import { ApiConfiguration } from './api/api-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ItemListComponent } from './item-list/item-list.component';
import { ApiModule } from './api/api.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export function initApiConfiguration(apiConfig: ApiConfiguration): Function {
  return () => {
    apiConfig.rootUrl = environment.apiUrl;
  };
}

export const INIT_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ApiConfiguration],
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule
  ],
  providers: [
    INIT_API_CONFIGURATION
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
