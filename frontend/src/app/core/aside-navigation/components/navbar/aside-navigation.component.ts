import {Component, OnInit} from '@angular/core';
import {NavLinkModel} from "../../model/nav-link.model";

@Component({
  selector: 'aside-navigation',
  templateUrl: './aside-navigation.component.html',
  styleUrls: ['./aside-navigation.component.scss']
})
export class AsideNavigationComponent implements OnInit {
  openSidebar = true
  navLinks: NavLinkModel[] = [
    {icon: 'check', title: 'todos', routerLink: 'main'},
    {icon: 'person', title: 'dashboard', routerLink: '#'},
    {icon: 'settings', title: 'settings', routerLink: 'settings'},
  ];

  ngOnInit(): void {
  }

  logout() {
  }

  onMenuClick() {
    this.openSidebar = !this.openSidebar;
  }
}
