package nem.com.service;

import nem.com.dto.response.ProductViewDto;
import nem.com.entity.Customers;
import nem.com.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<ProductViewDto> createProductView(List<ProductViewDto> list);
    Products getOne(Integer id);
    List<Products> getAll();

    Page<Products> getAllByAllPropertites(Integer[] size , Short[] category  , Integer[] color , Double max, Double min , Pageable pageable);

    List<Products> getAllNewPro() ;
    Products save(Products products);
    Products update(Products products);
    void delete(Integer id);
}
