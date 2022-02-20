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
    {icon: 'person', title: 'dashboard'},
    {icon: 'people', title: 'metric'},
    {icon: 'add', title: 'random'},
    {icon: 'settings', title: 'settings'},
  ];

  ngOnInit(): void {
  }

  logout() {
  }

  onMenuClick() {
    this.openSidebar = !this.openSidebar;
  }
}
