import { Component } from '@angular/core';
import { ImageProvider } from '../../providers/image-provider';
import { ModalController, NavController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

@Component({
  selector: 'page-ionic-gallery-modal',
  templateUrl: 'ionic-gallery-modal.html',
})
export class IonicGalleryModalPage {

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

    this.navController.push(GalleryModal, {photos: this.images, initialSlide: 0});
    // let modal = this.modalController.create(GalleryModal, { photos: this.images, initialSlide: 0 }, {showBackdrop: false, enableBackdropDismiss: false, cssClass: 'modal-full-screen'});
    // modal.present();
  }


}
