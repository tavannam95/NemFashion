package nem.com.service.impl;

import nem.com.dto.request.CartDTO;
import nem.com.entity.Carts;
import nem.com.repository.CartsRepository;
import nem.com.service.CartService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartsRepository cartsRepository;

    public CartServiceImpl(CartsRepository cartsRepository) {
        this.cartsRepository = cartsRepository;
    }

    @Override
    public Carts addToCart(Carts request) {
        Carts cartExist = this.cartsRepository.findCartsByProductDetailAndCustomer(
                request.getProductsDetail().getId(),
                request.getCustomer().getId());

        if (cartExist == null) {
            cartExist = new Carts();
            cartExist.setQuantity(request.getQuantity());
            cartExist.setCustomer(request.getCustomer());
            cartExist.setProductsDetail(request.getProductsDetail());
        } else {
            cartExist.setQuantity(request.getQuantity() + cartExist.getQuantity());
        }

        return cartsRepository.save(cartExist);
    }

    @Override
    public Carts updateCart(Carts request) {
        Carts cartExist = this.cartsRepository.findCartsByProductDetailAndCustomer(
                request.getProductsDetail().getId(),
                request.getCustomer().getId());
        cartExist.setQuantity(request.getQuantity());
        return cartsRepository.save(cartExist);
    }

    @Override
    public void deleteCart(Integer cartId) {
        this.cartsRepository.deleteById(cartId);
    }

    @Override
    public void deleteAllByCustomerId(Integer customerId) {
        this.cartsRepository.deleteAllByCustomerId(customerId);
    }

    @Override
    public List<Carts> findAllByCustomerId(Integer customerId) {
        return this.cartsRepository.findCartsByCustomerId(33);
    }
}
