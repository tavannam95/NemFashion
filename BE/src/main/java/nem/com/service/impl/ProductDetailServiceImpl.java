package nem.com.service.impl;

import nem.com.entity.ProductsDetails;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.ProductDetailService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductsDetailsRepository productsDetailsRepository;

    public ProductDetailServiceImpl(ProductsDetailsRepository productsDetailsRepository) {
        this.productsDetailsRepository = productsDetailsRepository;
    }

    @Override
    public List<ProductsDetails> getAll() {
        return this.productsDetailsRepository.findAll();
    }

    @Override
    public ProductsDetails getOne(Integer id) {
        return this.productsDetailsRepository.findById(id).get();
    }

    @Override
    public ProductsDetails update(ProductsDetails productsDetails) {
        return this.productsDetailsRepository.save(productsDetails);
    }

    @Override
    public void delete(Integer id) {
        ProductsDetails productsDetails = getOne(id);
        this.productsDetailsRepository.delete(productsDetails);
    }

    @Override
    public ProductsDetails save(ProductsDetails productsDetails) {
        return this.productsDetailsRepository.save(productsDetails);
    }

    @Override
    public List<ProductsDetails> findProductsDetailsByProductId(Integer productId) {
        return this.productsDetailsRepository.findProductsDetailsByProductId(productId);
    }

    @Override
    public ProductsDetails findProductDetailBySizeAndColor(Integer productId, Integer sizeId, Integer colorId) {
        return this.productsDetailsRepository.findProductDetailBySizeAndColor(productId, sizeId, colorId);
    }
}
