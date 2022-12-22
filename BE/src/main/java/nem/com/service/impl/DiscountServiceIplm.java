package nem.com.service.impl;

import nem.com.dto.request.SearchDiscountDTO;
import nem.com.entity.Discounts;
import nem.com.entity.ProductDiscount;
import nem.com.entity.Products;
import nem.com.repository.DiscountsRepository;
import nem.com.repository.ProductDiscountRepository;
import nem.com.repository.ProductsRepository;
import nem.com.scheduled.ProcessToPromotion;
import nem.com.service.DiscountService;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DiscountServiceIplm implements DiscountService  {

    private final DiscountsRepository repository ;
    private final ProductDiscountRepository discountRepository ;
    private final ProductsRepository productsRepository ;

    private final DiscountsRepository discountsRepository ;
    private final ProductDiscountRepository productDiscountRepository ;
    public DiscountServiceIplm( DiscountsRepository repository ,
                                ProductDiscountRepository discountRepository,
                                ProductsRepository productsRepository ,
                                DiscountsRepository discountsRepository ,
                                ProductDiscountRepository productDiscountRepository ){
        this.repository = repository ;
        this.productsRepository = productsRepository ;
        this.discountRepository = discountRepository ;
        this.discountsRepository = discountsRepository ;
        this.productDiscountRepository = productDiscountRepository ;
    }

    @Override
    public List<Discounts> findAll(SearchDiscountDTO request) {
        return this.repository.findAll( request.getName() , request.getStartDate() , request.getEndDate() , request.getStatus()) ;
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
