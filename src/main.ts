import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  registerLocaleData(localeEs);