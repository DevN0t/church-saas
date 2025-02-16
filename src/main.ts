import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import AOS from 'aos';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

AOS.init({
  once: true, // A animação acontece só uma vez (não repete ao rolar)
  offset: 50, // Começa 100px antes do elemento entrar na tela
  duration: 1000, // Duração da animação (800ms)
});
