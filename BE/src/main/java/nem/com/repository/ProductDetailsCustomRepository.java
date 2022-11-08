package nem.com.repository;

import nem.com.dto.request.ProductDetailsDTO;

import java.util.List;

public interface ProductDetailsCustomRepository {
    List<ProductDetailsDTO> getProductDetailsByIdPro(Integer id);
}
