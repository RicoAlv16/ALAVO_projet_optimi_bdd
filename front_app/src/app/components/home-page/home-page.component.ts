import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [ButtonModule, FooterComponent, HeaderComponent, RouterLink],
})
export class HomePageComponent {}
