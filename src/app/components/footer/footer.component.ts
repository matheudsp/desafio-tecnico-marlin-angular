import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapTwitterX,
  bootstrapInstagram,
  bootstrapFacebook,
  bootstrapLinkedin,
  bootstrapYoutube,
} from '@ng-icons/bootstrap-icons';
import { ionArrowUp } from '@ng-icons/ionicons';
@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders: [
    provideIcons({
      bootstrapTwitterX,
      bootstrapInstagram,
      bootstrapFacebook,
      bootstrapLinkedin,
      bootstrapYoutube,
      ionArrowUp,
    }),
  ],
})
export class FooterComponent {}
