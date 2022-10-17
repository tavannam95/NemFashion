package nem.com.service.impl;

import nem.com.entity.ProductsDetails;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.ProductDetailService;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductsDetailsRepository productsDetailsRepository;

    public ProductDetailServiceImpl(ProductsDetailsRepository productsDetailsRepository) {
        this.productsDetailsRepository = productsDetailsRepository;
    }

    @Override
    public ProductsDetails save(ProductsDetails productsDetails) {
        return this.productsDetailsRepository.save(productsDetails);
    }
}
