package nem.com.service;

import nem.com.domain.request.ProductDetailsDTO;
import nem.com.domain.response.ProductDetailResponseDTO;
import nem.com.entity.ProductsDetails;

import java.util.List;

public interface ProductDetailService {

    List<ProductsDetails> getAll();

    ProductsDetails getOne(Integer id);

    ProductsDetails update(ProductsDetails productsDetails);

    void delete(Integer id);

    ProductsDetails save(ProductsDetails productsDetails);

    List<ProductDetailsDTO> getByIdProduct(Integer id);
    List<ProductsDetails> findProductsDetailsByProductId(Integer productId);

    ProductsDetails findProductDetailBySizeAndColor(Integer productId, Integer sizeId, Integer colorId);
    List<ProductDetailResponseDTO> createProductDetails(List<ProductDetailResponseDTO> list);

    List<ProductsDetails> findProductDetailByProductSizeColor(ProductDetailResponseDTO productViewDto);
}
