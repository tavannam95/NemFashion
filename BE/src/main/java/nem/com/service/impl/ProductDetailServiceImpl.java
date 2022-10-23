package nem.com.service.impl;

import nem.com.dto.request.ProductDetailsDTO;
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
    public List<ProductDetailsDTO> getByIdProduct(Integer id) {
        return this.productsDetailsRepository.getProductDetailsByIdPro(id);
    }
}
