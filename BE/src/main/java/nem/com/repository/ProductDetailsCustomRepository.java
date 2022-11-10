package nem.com.repository;

import nem.com.dto.request.ProductDetailsDTO;

import java.util.List;
import java.util.Locale;

public interface ProductDetailsCustomRepository {
    List<ProductDetailsDTO> getProductDetailsByIdPro(Integer id);

    List<ProductDetailsDTO> getProductDetailsByListID(List<Long> lstId);
}
