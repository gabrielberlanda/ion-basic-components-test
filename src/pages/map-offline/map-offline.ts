import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Platform, normalizeURL } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-map-offline',
  templateUrl: 'map-offline.html',
})
export class MapOfflinePage {

  public map: any;
  constructor(private platform: Platform, private file: File) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapOfflinePage');
    this.createOfflineMap();
  }

  async createOfflineMap() {
    let storageLocation;

    //As IOS and Android is having different default storage directory //we need to define as per the platform
    if (this.platform.is("ios")) {
      storageLocation = this.file.documentsDirectory + "files/"
    } else if (this.platform.is("android")) {
      storageLocation = this.file.externalDataDirectory + "maps/"
    } else {
      storageLocation = this.file.cacheDirectory + "maps/"
    }

    let path;
    if((window as any).Ionic.WebView) {
      path = (window as any).Ionic.WebView.convertFileSrc(storageLocation);
    } else {
      path = normalizeURL(storageLocation);
    }
    
    //anta
    // let currentCenterlng = -77.0636;
    // let currentCenterlat = -9.5408;

    //sam
    let currentCenterlng = -43.4551;
    let currentCenterlat = -20.2191;

    // in this ({root folder}/{z}/{x}/{y}.png) folder structure z is zoom level.
    let defaultZoomLevel = 18;

    //this.map is map object defined in global scope 
    if (this.map == null) {
      this.map = L.map("map", { bounceAtZoomLimits: false})
                  .setView([currentCenterlat, currentCenterlng], defaultZoomLevel);
    }
    console.log('Path', path);
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    L.tileLayer(path + '{z}/{x}/{y}.png', { attributions: '', maxZoom: 19, minZoom: 4})
    .addTo(this.map);
  }
}