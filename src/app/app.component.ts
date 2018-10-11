import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPage } from '../pages/camera/camera';
import { GeoLocationPage } from '../pages/geo-location/geo-location';
import { QrCodeReaderPage } from '../pages/qr-code-reader/qr-code-reader';
import { SignaturePage } from '../pages/signature/signature';
import { NgxGalleryPage } from '../pages/ngx-gallery/ngx-gallery';
import { IonicGalleryModalPage } from '../pages/ionic-gallery-modal/ionic-gallery-modal';
import { FileSystemPage } from '../pages/file-system/file-system';
import { MapPage } from '../pages/map/map';
import { MapOfflinePage } from '../pages/map-offline/map-offline';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CameraPage;
  pages: AppPage[] = [];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages.push({title: 'Camera', component: CameraPage});
    this.pages.push({title: 'Geo Localização', component: GeoLocationPage});
    this.pages.push({title: 'Leitor de QRCODE', component: QrCodeReaderPage});
    this.pages.push({title: 'Assinatura', component: SignaturePage});
    this.pages.push({title: 'Ngx Galeria', component: NgxGalleryPage});
    this.pages.push({title: 'Ionic Gallery Modal', component: IonicGalleryModalPage});
    this.pages.push({title: 'Sistema de arquivos', component: FileSystemPage});
    this.pages.push({title: 'Mapa', component: MapPage});
    this.pages.push({title: 'Mapa offline', component: MapOfflinePage});

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(component:any) {
    this.rootPage = component;
  }
}

interface AppPage {
  title: string;
  component: any;
}

