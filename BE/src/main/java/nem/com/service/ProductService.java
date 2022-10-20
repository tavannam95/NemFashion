package nem.com.service;

import nem.com.dto.response.ProductViewDto;
import nem.com.entity.Customers;
import nem.com.entity.Products;

import java.util.List;

public interface ProductService {
    List<ProductViewDto> createProductView(List<ProductViewDto> list);
    Products getOne(Integer id);
    List<Products> getAll();
    Products save(Products products);
    Products update(Products products);
    void delete(Integer id);
}
