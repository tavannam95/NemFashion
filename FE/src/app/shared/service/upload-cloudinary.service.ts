import {Injectable} from '@angular/core';
import {UploadCloudinaryApiService} from './api/upload-cloudinary-api.service';

@Injectable({
    providedIn: 'root'
})
export class UploadCloudinaryService {

    constructor(private readonly uploadService: UploadCloudinaryApiService) {
    }


    upload(files: any) {
        return this.uploadService.upload(files);
    }

}
