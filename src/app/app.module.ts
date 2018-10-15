import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { CameraPage } from '../pages/camera/camera';
import { GeoLocationPage } from '../pages/geo-location/geo-location';
import { QrCodeReaderPage } from '../pages/qr-code-reader/qr-code-reader';
import { SignaturePage } from '../pages/signature/signature';
import { NgxGalleryPage } from '../pages/ngx-gallery/ngx-gallery';
import { ImageProvider } from '../providers/image-provider';
import { IonicGalleryModalPage } from '../pages/ionic-gallery-modal/ionic-gallery-modal';
import { FileSystemPage } from '../pages/file-system/file-system';
import { FileFormModal } from '../pages/file-system/file-form/file-form';
import { DirectivesModule } from '../directives/directives.module';
import { MapPage } from '../pages/map/map';
import { MapOfflinePage } from '../pages/map-offline/map-offline';


@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    GeoLocationPage,
    QrCodeReaderPage,
    SignaturePage,
    NgxGalleryPage,
    IonicGalleryModalPage,
    FileSystemPage,
    FileFormModal,
    MapPage,
    MapOfflinePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SignaturePadModule,
    NgxImageGalleryModule,
    ionicGalleryModal.GalleryModalModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    GeoLocationPage,
    QrCodeReaderPage,
    SignaturePage,
    NgxGalleryPage,
    IonicGalleryModalPage,
    FileSystemPage,
    FileFormModal,
    MapPage,
    MapOfflinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    ImageProvider,
    WebView,
    File,
    Geolocation,
    {provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
