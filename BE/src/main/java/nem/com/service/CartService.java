package nem.com.service;

import nem.com.dto.request.CartDTO;
import nem.com.entity.Carts;

import java.util.List;

public interface CartService {

    Carts addToCart(Carts request);

    void deleteCart(Integer cartId);

    List<Carts> findAllByCustomerId(Integer customerId);

}
