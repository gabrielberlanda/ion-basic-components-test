import { Component, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { ImageProvider } from '../../providers/image-provider';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'ngx-page-gallery',
  templateUrl: 'ngx-gallery.html',
})
export class NgxGalleryPage {

  public images: GALLERY_IMAGE[] = [];
  
  @ViewChild(NgxImageGalleryComponent)
  public galleryComponent: NgxImageGalleryComponent;

  public galleryConfig: GALLERY_CONF = {
    imageOffset: 'opx',
    showImageTitle: true,
    showCloseControl: true,
    showExtUrlControl: false
  }

  constructor(
    public file: File,
    private http: HttpClient,
    private imageProvider: ImageProvider
  ) {}

  //Get de dados, deve ficar em 1 service
  ionViewDidLoad() {
    this.imageProvider.loadImages().then((result) => {
      this.images = result.images.map(image => {
        return {
          url: image.large_url,
          thumbnailUrl: image.url,
          title: `Title ${image.id}`,
          altText: `Title ${image.id}`,
          extUrl: image.url
        }
      });
    }, err => console.error(err));
  }

  onOpenGallery() {
    this.galleryComponent.open();
  }

}
