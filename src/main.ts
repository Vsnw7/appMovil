// Importamos la herramienta necesaria para que Angular se ejecute en un navegador web
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importamos el "Módulo Raíz". Angular necesita saber cuál es la pieza principal para empezar.
import { AppModule } from './app/app.module';

// BOOTSTRAP (Arranque):
// 1. platformBrowserDynamic(): Crea el entorno de ejecución en el navegador.
// 2. bootstrapModule(AppModule): Carga el módulo principal y arranca la aplicación.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err)); // Si algo falla al iniciar la app, muestra el error en la consola.