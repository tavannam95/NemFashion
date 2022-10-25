package nem.com.service.impl;

import nem.com.dto.response.ProductViewDto;
import nem.com.entity.Products;
import nem.com.entity.ProductsDetails;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.ProductsRepository;
import nem.com.service.ProductDetailService;
import nem.com.service.ProductService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductsRepository productsRepository;

    private final ProductDetailService productDetailService;

    public ProductServiceImpl(ProductsRepository productsRepository, ProductDetailService productDetailService) {
        this.productsRepository = productsRepository;
        this.productDetailService = productDetailService;
    }

    @Override
    public List<ProductViewDto> createProductView(List<ProductViewDto> list) {
        for (ProductViewDto p: list
             ) {
            ProductsDetails productsDetails = new ProductsDetails();
            productsDetails.setProduct(p.getProduct());
            productsDetails.setColor(p.getColor());
            productsDetails.setSize(p.getSize());
            productsDetails.setQuantity(p.getQuantity());

            this.productDetailService.save(productsDetails);
        }
        return list;
    }

    @Override
    public Products getOne(Integer id) {
        return this.productsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng có mã: " + id));
    }

    @Override
    public List<Products> getAll() {
        return this.productsRepository.findAll();
    }

    @Override
    public List<Products> getAllBySize(Integer[] size ) {
        return this.productsRepository.findProBySize(size );
    }

    @Override
    public Products save(Products products) {
        System.out.println(products.getCreateDate());
        return this.productsRepository.save(products);
    }

    @Override
    public Products update(Products products) {
        return this.productsRepository.save(products);
    }

    @Override
    public void delete(Integer id) {
        Products products = getOne(id);
        products.setStatus(0);
        this.productsRepository.save(products);
    }
}
