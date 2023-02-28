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
  ],
  providers: [
    AppInitializerProvider,
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
