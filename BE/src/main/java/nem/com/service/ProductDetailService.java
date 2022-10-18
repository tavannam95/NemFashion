package nem.com.service;

import nem.com.entity.ProductsDetails;

import java.util.List;

public interface ProductDetailService {

    List<ProductsDetails> getAll();
    ProductsDetails getOne(Integer id);
    ProductsDetails update(ProductsDetails productsDetails);
    void delete(Integer id);
    ProductsDetails save(ProductsDetails productsDetails);
}
