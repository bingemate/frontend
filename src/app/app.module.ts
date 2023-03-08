import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { fr_FR, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppInitializerProvider } from './core/app-initializer.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CdkScrollable } from '@angular/cdk/overlay';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollableElement,
  CdkVirtualScrollableWindow,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CoreModule } from './core/core.module';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NgxsModule } from '@ngxs/store';
import { ThemeState } from './core/theme/store/theme.state';
import { environment } from '../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NzListModule } from 'ng-zorro-antd/list';
import { AuthState } from './core/auth/store/auth.state';

registerLocaleData(fr);

const ngZorroConfig: NzConfig = {
  notification: {
    nzPlacement: 'bottomRight',
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzSpaceModule,
    NzDividerModule,
    NzTableModule,
    CdkScrollable,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollableWindow,
    CdkVirtualScrollableElement,
    NzSwitchModule,
    NzPageHeaderModule,
    NzBadgeModule,
    NzPopoverModule,
    NzDropDownModule,
    // Classic Ngxs State, wipe at refresh
    NgxsModule.forRoot([ThemeState, AuthState], {
      developmentMode: !environment.production,
    }),
    // SessionStorage Ngxs State, persist at refresh
    /*    NgxsStoragePluginModule.forRoot({
      key: [AuthState],
      storage: StorageOption.SessionStorage,
      afterDeserialize(obj: unknown, key: string): unknown {
        if (!environment.production) {
          console.debug('Deserialize NGXS from session storage', obj, key);
        }
        return obj;
      },
    }),*/
    // LocalStorage Ngxs State, persist at refresh and browser close
    NgxsStoragePluginModule.forRoot({
      key: [ThemeState, AuthState],
      storage: StorageOption.LocalStorage,
      afterDeserialize(obj: unknown, key: string): unknown {
        if (!environment.production) {
          console.debug('Deserialize NGXS from local storage', obj, key);
        }
        return obj;
      },
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NzListModule,
    NzMenuModule,
  ],
  providers: [
    AppInitializerProvider,
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
