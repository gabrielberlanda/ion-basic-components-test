import { Component } from '@angular/core';
import { ImageProvider } from '../../providers/image-provider';
import { ModalController, NavController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { IonSlideGalleryModal } from './ion-slide-gallery-modal';

@Component({
  selector: 'ion-slide-gallery',
  templateUrl: 'ion-slide-gallery.html',
})
export class IonSlideGallery {

  images: any[];

  constructor(private imageProvider: ImageProvider, private modalController: ModalController, private navController: NavController) {}

  ionViewDidLoad() {
    this.imageProvider.loadImages().then((result) => {
      this.images = result.images.map(image => {
        return {
          url: image.large_url,
          title: `Title ${image.id}`,
        }
      });
    }, err => console.error(err));
  }

  onOpenGallery() {
    this.navController.push(IonSlideGalleryModal, {photos: this.images, initialSlide: 0});
  }


}
