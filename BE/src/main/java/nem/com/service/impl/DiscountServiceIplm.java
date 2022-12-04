package nem.com.service.impl;

import nem.com.entity.Discounts;
import nem.com.entity.ProductDiscount;
import nem.com.entity.Products;
import nem.com.repository.DiscountsRepository;
import nem.com.repository.ProductDiscountRepository;
import nem.com.repository.ProductsRepository;
import nem.com.service.DiscountService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DiscountServiceIplm implements DiscountService  {

    private final DiscountsRepository repository ;
    private final ProductDiscountRepository discountRepository ;
    private final ProductsRepository productsRepository ;
    public DiscountServiceIplm( DiscountsRepository repository ,
                                ProductDiscountRepository discountRepository,
                                ProductsRepository productsRepository ){
        this.repository = repository ;
        this.productsRepository = productsRepository ;
        this.discountRepository = discountRepository ;
    }

    @Override
    public List<Discounts> findAll() {
        return this.repository.findAll() ;
    }

    @Override
    public Discounts create(Discounts discounts) {
        return this.repository.save(discounts);
    }

    @Override
    public Discounts update(Discounts discounts) {
        return this.repository.save(discounts);
    }

}
