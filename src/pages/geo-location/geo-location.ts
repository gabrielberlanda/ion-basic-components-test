import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-geo-location',
  templateUrl: 'geo-location.html',
})
export class GeoLocationPage {

  public locationSubscription: Subscription;
  public asyncPositions: Geoposition[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geoLocation: Geolocation,
    public loadingController: LoadingController
  ) {}

  ionViewDidLoad() {
    this.locationSubscription = this.geoLocation
                                    .watchPosition({
                                      enableHighAccuracy: true,
                                      maximumAge: 0
                                    })
                                    .subscribe((position:Geoposition) => {
                                      this.asyncPositions.push(position);
                                    });
  }

  ionViewDidLeave(){
    this.locationSubscription.unsubscribe();
  }

  onShowCurrentLocation() {
    
    const loading = this.loadingController.create({content: 'Carregando sua posição atual...'});
    loading.present();

    setTimeout(() => {
      this.geoLocation
          .getCurrentPosition({maximumAge: 0, enableHighAccuracy: true})
          .then((position:Geoposition) => {
            loading.setSpinner('hide');
            loading.setContent(`
              <ion-content>
                <span>Posição carregada com sucesso!</span>
                <p ion-text>Latitude ${position.coords.latitude}</p>
                <p ion-text>Longitude ${position.coords.longitude}</p>
              </ion-content>
            `);
            setTimeout(() => loading.dismiss(), 5000);
          })
          .catch((err) => console.error('Ops, an error ocurred getting the position', err));

    }, 1000);

  }

}
