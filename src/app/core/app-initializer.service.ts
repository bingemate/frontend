import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Store } from '@ngxs/store';
import { InitTheme } from './theme/store/theme.actions';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => {
    store.dispatch(new InitTheme());
  },
  deps: [Store, ThemeService],
  multi: true,
};
