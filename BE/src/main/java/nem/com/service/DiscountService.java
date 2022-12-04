package nem.com.service;

import nem.com.entity.Discounts;

import java.util.List;

public interface DiscountService {

    List<Discounts> findAll() ;

    Discounts create( Discounts discounts ) ;

    Discounts update( Discounts discounts ) ;

}
