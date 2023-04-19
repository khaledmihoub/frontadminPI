import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../../Models/Image";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = "http://localhost:8085/backendPI"

  constructor(private http: HttpClient,private sanitizer:DomSanitizer) {
  }

  public GetImageByIdProduct(productId: number){
    return this.http.get( this.baseUrl+`/image/product/${productId}`)
  }

  public createImage(Image: any[]){
    let imgFinales = [];
    for(let i=0; i<Image.length; i++){
      const imageFileData = Image[i];
      const imageBlob = this.dataURItoBlob(imageFileData.bytes, imageFileData.contentType);
      const imageFile = new File([imageBlob], imageFileData.originalFilename, {type: imageFileData.contentType});
      imgFinales.push({
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      })
    }

    return imgFinales;
  }

  public dataURItoBlob(imageBytes: any, imageType: any){
    const byteString = window.atob(imageBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }
}
