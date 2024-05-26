import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { UserAuthService } from 'src/app/component/services/Auth/user-auth.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    public userAuthService: UserAuthService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  // End open close
  ngOnInit() {
    const userRole = this.userAuthService.getRole()?.toUpperCase();
    if (userRole) {
      this.sidebarnavItems = ROUTES.filter(sidebarnavItem => this.filterByRole(sidebarnavItem, userRole));
    }
  }
  filterByRole(item: RouteInfo, userRole: string | null): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true; // if no roles are defined, the item is visible to everyone
    }
    return item.roles.includes(userRole || '');
  }
}
