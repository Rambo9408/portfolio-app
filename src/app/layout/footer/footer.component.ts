import { Component } from '@angular/core';
import { PORTFOLIO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  data = PORTFOLIO.profile;
}
