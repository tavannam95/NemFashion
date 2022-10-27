package nem.com.service.impl;

import nem.com.entity.Products;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.ProductsRepository;
import nem.com.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public Page<Products> getAllByAllPropertites(Integer[] size, Short[] category, Integer[] color, Double max, Double min, Pageable pageable) {
        return this.productsRepository.findProByAllProperty( size , category , color , max , min , pageable );
    }

    @Override
    public List<Products> getAllNewPro() {
        List<Products> listpro = new ArrayList<>();
        int i = 0 ;
        for( Products p : this.productsRepository.findNewPro() ){
            listpro.add(p);
            i++ ;
            if( i == 10 ){
                break;
            }
        }
        return listpro;
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
