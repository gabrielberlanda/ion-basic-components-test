import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  public base64Image: string = null;
  public allowEdit: boolean = false;
  public cameraSource: number;

  constructor(private alertController: AlertController, private camera: Camera, private domSanitizer: DomSanitizer) {}

  onTakePhoto = () => {
    const alert = this.alertController.create({
      message: 'Selecione a fonte de dados'
    });

    alert.addButton({
      text: 'Galeria',
      handler: (data) => {
        this.cameraSource = this.camera.PictureSourceType.PHOTOLIBRARY;
      }
    });

    alert.addButton({
      text: 'Camera',
      handler: () => {
        this.cameraSource = this.camera.PictureSourceType.CAMERA;
      }
    });

    alert.present();

    alert.onDidDismiss((source) => {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.cameraSource,
        correctOrientation: true,
        allowEdit: this.allowEdit
      }
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        console.error(err);
      });
    })
  }

}
