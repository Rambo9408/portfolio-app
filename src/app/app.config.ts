import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    // The page ships pre-rendered; hydration reuses that DOM instead of rebuilding it,
    // and replays any click made before the JS finished loading.
    provideClientHydration(withEventReplay()),
  ]
};
