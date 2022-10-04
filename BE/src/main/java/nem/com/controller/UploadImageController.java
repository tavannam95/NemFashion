package nem.com.controller;

import nem.com.service.UploadImageCloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/image")
public class UploadImageController {

    private final UploadImageCloudinaryService uploadService;

    public UploadImageController(UploadImageCloudinaryService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping("upload")
    public ResponseEntity<?> upload(@RequestParam("files") MultipartFile[] files) throws IOException {
        return new ResponseEntity<>(uploadService.upload(files), HttpStatus.OK);
    }

}
