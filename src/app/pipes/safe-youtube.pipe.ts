import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeYoutube' // Este es el nombre que usas en el HTML: [src]="url | safeYoutube"
})
export class SafeYoutubePipe implements PipeTransform {

  // Inyectamos el 'Sanitizer' (Desinfectante) de Angular.
  // Angular protege tu app eliminando código sospechoso de las URLs.
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // EL PROBLEMA: Angular bloquea por defecto cualquier URL externa dentro de un <iframe>.
    
    // LA SOLUCIÓN: .bypassSecurityTrustResourceUrl()
    // Le dice explícitamente a Angular: "Yo (el programador) garantizo que esta URL es segura".
    // Esto permite que el video de YouTube se cargue sin errores de seguridad.
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}