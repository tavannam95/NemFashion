package nem.com.repository;

import nem.com.domain.request.ProductDetailsDTO;

import java.util.List;

public interface ProductDetailsCustomRepository {
    List<ProductDetailsDTO> getProductDetailsByIdPro(Integer id);
}
