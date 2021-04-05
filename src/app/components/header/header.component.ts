import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@service/api.service';
import { HeaderMenu } from './types/header-menu.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef | undefined;
  @ViewChild('button') button: ElementRef | undefined;

  response$: Observable<HeaderMenu[]> | undefined;
  isOpen = false;
  isTopScrolled = true;
  isHandheldDevice: boolean = false;

  private readonly handheldDeviceWidth = 960;

  constructor(private apiService: ApiService) {}

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.resetMobileState();
  }

  ngOnInit(): void {
    this.response$ = this.apiService.get<HeaderMenu[]>(
      './assets/mocks/header/cms-response.json'
    );
    this.isHandheldDevice = this.detectMobileScreenType(window.innerWidth);
  }

  onClickMenu(): void {
    if (!this.isHandheldDevice) {
      return;
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.button?.nativeElement.focus();
    }
  }

  private detectMobileScreenType(size: number): boolean {
    return size < this.handheldDeviceWidth;
  }

  private resetMobileState(): void {
    this.isHandheldDevice = this.detectMobileScreenType(window.innerWidth);

    if (!this.isHandheldDevice) {
      this.isOpen = false;
    }
  }
}
