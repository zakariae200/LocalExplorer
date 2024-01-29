import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stickyMenu = false;
  navigationOpen = false;
  dropdown = false;
  page: string = 'home'; // Adjust the page property initialization based on your logic
  darkMode = false; // Initialize darkMode property
  scrollTop = false;
  dropdownOpen = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    this.stickyMenu = window.pageYOffset > 20;
    this.scrollTop = window.pageYOffset > 50;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  toggleNavigation() {
    this.navigationOpen = !this.navigationOpen;
  }

  toggleDropdown(event: Event) {
    this.dropdown = !this.dropdown;
    event.preventDefault();
  }
}
