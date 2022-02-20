import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.scss']
})
export class NavbarLinkComponent implements OnInit {

  @Input() icon?: string
  @Input() title?: string

  ngOnInit(): void {

  }

}
