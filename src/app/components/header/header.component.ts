import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircleMicro } from '@ng-icons/heroicons/micro';
import {ionMenu} from '@ng-icons/ionicons'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  viewProviders:[provideIcons({ heroUserCircleMicro, ionMenu })]
})
export class HeaderComponent {
  menuActive = false;
  
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
}