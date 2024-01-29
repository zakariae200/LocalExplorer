import { Component, OnInit ,HostListener} from '@angular/core';
import { AuthService } from '../Services/authh.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  showDropdown: boolean = false;
  stickyMenu = false;
  navigationOpen = false;
  dropdown = false;
  page: string = 'home'; // Adjust the page property initialization based on your logic
  darkMode = false; // Initialize darkMode property
  scrollTop = false;
  dropdownOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.getUserName().subscribe((name) => {
      this.userName = name;
    });
  }
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

  toggleDropdowne(event: Event) {
    this.dropdown = !this.dropdown;
    event.preventDefault();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  signOut(): void {
    // Implement sign-out logic here
  }
  
}
