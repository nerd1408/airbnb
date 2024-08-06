import { Component, effect, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { CategoryComponent } from './category/category.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ToastService } from '../toast.service';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/model/user.model';
import { PropertiesCreateComponent } from '../../landlord/properties-create/properties-create.component';
import { SearchComponent } from '../../tenant/search/search.component';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
import { AuthPopupComponent } from '../../auth-popup/auth-popup.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent,
    MatDialogModule,
    AuthPopupComponent,
    SearchComponent,
    
  ],
  providers: [DialogService, ToastService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  location = 'Anywhere';
  guests = 'Add guests';
  dates = 'Any week';

  toastService = inject(ToastService);
  authService = inject(AuthService);
  // dialogService = inject(DialogService);
  activatedRoute = inject(ActivatedRoute);
  
  constructor(private _dialog: MatDialog,) {
    effect(() => {
      if (this.authService.fetchUser().status === 'OK') {
        this.connectedUser = this.authService.fetchUser().value!;
        this.currentMenuItems = this.fetchMenu();
      }
    });
  }
  

  login(email: string, password: string) {
    this.authService.login({ email, password });
  }

  logout = () => this.authService.logout();

  currentMenuItems: MenuItem[] | undefined = [];
  connectedUser: User = { email: this.authService.notConnected };



  ngOnInit(): void {
    this.authService.fetch(false);
    this.extractInformationForSearch();
  }

  private fetchMenu(): MenuItem[] {
    if (this.authService.isAuthenticated()) {
      return [
        {
          label: 'My properties',
          routerLink: 'landlord/properties',
          visible: this.hasToBeLandlord(),
        },
        {
          label: 'My booking',
          routerLink: 'booking',
        },
        {
          label: 'My reservation',
          routerLink: 'landlord/reservation',
          visible: this.hasToBeLandlord(),
        },
        {
          label: 'Log out',
          command: () => this.logout(),
        },
      ];
    } else {
      return [
        {
          label: 'Sign up',
          styleClass: 'font-bold',
          command: () => this.openAuthPopup(),
        },
        {
          label: 'Log in',
          command: () => this.openAuthPopup(),
        },
      ];
    }
  }

  hasToBeLandlord(): boolean {
    return this.authService.hasAnyAuthority('ROLE_LANDLORD');
  }

  openNewListing(): void {
    const ref = this._dialog.open(PropertiesCreateComponent)
    // const ref = this._dialog.open(PropertiesCreateComponent, {
    //   width: '60%',
    //   header: 'Airbnb your home',
    //   closable: true,
    //   focusOnShow: true,
    //   modal: true,
    //   showHeader: true,
    // });
  }

  openNewSearch(): void {
    const ref = this._dialog.open(SearchComponent)
    // const ref = this._dialog.open(SearchComponent, {
    //   width: '40%',
    //   header: 'Search',
    //   closable: true,
    //   focusOnShow: true,
    //   modal: true,
    //   showHeader: true,
    // });
  }

  private extractInformationForSearch(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        if (params['location']) {
          this.location = params['location'];
          this.guests = params['guests'] + ' Guests';
          this.dates =
            dayjs(params['startDate']).format('MMM-DD') +
            ' to ' +
            dayjs(params['endDate']).format('MMM-DD');
        } else if (this.location !== 'Anywhere') {
          this.location = 'Anywhere';
          this.guests = 'Add guests';
          this.dates = 'Any week';
        }
      },
    });
  }

  openAuthPopup(): void {
    const ref = this._dialog.open(AuthPopupComponent,{
      width: '50%',
    })
    // const ref = this.dialogService.open(AuthPopupComponent, {
    //   width: '50%',
    //   header: 'Sign Up / Log In',
    //   closable: true,
    //   focusOnShow: true,
    //   modal: true,
    //   showHeader: true,
    // });
  }
}
