package nem.com.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UploadImageCloudinaryService {

    List<String> upload(MultipartFile[] files) throws IOException;

    void delete(String publicId);
}
