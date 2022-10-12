package nem.com.service.impl;

import nem.com.entity.Products;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.ProductsRepository;
import nem.com.service.ProductService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductsRepository productsRepository;

    public ProductServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
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
