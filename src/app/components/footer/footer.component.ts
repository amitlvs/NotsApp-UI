import { Component } from '@angular/core';

@Component({
  selector: 'notsapp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentDate = new Date(Date.now()).getFullYear();
}
