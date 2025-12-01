import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Esto confirma que es independiente
  imports: [IonicModule, CommonModule] // Importa sus propias herramientas
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

}