import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header', // Así se llama en el HTML: <app-header></app-header>
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent  implements OnInit {

  // @Input(): Hace que el título sea DINÁMICO.
  // Permite que, desde cualquier página (Inicio, Perfil, etc.), le pases un texto diferente.
  // Ejemplo de uso: <app-header title="Noticias"></app-header>
  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

}