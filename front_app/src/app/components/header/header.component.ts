import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Accueil', icon: 'pi pi-home' },
      { label: 'Trouver une soirée', icon: 'pi pi-search' },
      { label: 'Organiser une soirée', icon: 'pi pi-plus' },
      { label: 'Jeux', icon: 'pi pi-face-smile' },
    ];
  }
}
