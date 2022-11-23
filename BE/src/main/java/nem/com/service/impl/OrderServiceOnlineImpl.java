package nem.com.service.impl;

import nem.com.domain.request.OrderDTO;
import nem.com.entity.*;
import nem.com.exception.IsEmptyException;
import nem.com.exception.LimitQuantityException;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.OrderDetailsRepository;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderDetailOnlineService;
import nem.com.service.OrderServiceOnline;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class OrderServiceOnlineImpl implements OrderServiceOnline {

    private final OrdersRepository ordersRepository;
    private final OrderDetailsRepository orderDetailsRepository ;
    private final ProductsDetailsRepository productsDetailsRepository ;
    private final OrderDetailOnlineService orderDetailOnlineService;

    public OrderServiceOnlineImpl(OrdersRepository ordersRepository, OrderDetailsRepository repository, ProductsDetailsRepository productsDetailsRepository, OrderDetailOnlineService orderDetailOnlineService) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = repository ;
        this.productsDetailsRepository = productsDetailsRepository ;
        this.orderDetailOnlineService = orderDetailOnlineService;
    }


    @Override
    public Orders save(Orders order) {
        order.setDiscount(0.0);
        order.setCreateDate(new Timestamp(System.currentTimeMillis()));
        return this.ordersRepository.save(order);
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    public Orders checkout(OrderDTO request) {
        if (request.getListCarts() == null || request.getListCarts().isEmpty() || request.getListCarts().size() == 0) {
            throw new IsEmptyException("List cart is empty !");
        }

        Orders order = this.save(request.getOrder());
        for (Carts cart : request.getListCarts()) {
            OrderDetails orderDetail = new OrderDetails();
            ProductsDetails productsDetail = this.productsDetailsRepository.findById(cart.getProductsDetail().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Id not found " + cart.getProductsDetail().getId()));

            orderDetail.setOrder(order);
            orderDetail.setProductsDetail(productsDetail);
            orderDetail.setQuantity(cart.getQuantity());
            orderDetail.setDiscount(0.0);
            orderDetail.setUnitprice(cart.getProductsDetail().getProduct().getPrice());
            orderDetail.setStatus(1);

            if (cart.getQuantity() > productsDetail.getQuantity()) {
                throw new LimitQuantityException("Số lượng không đủ. Vui lòng cập nhật lại số lượng trong giỏ hàng !");
            }
            this.orderDetailOnlineService.save(orderDetail);
            productsDetail.setQuantity(productsDetail.getQuantity() - cart.getQuantity());
            this.productsDetailsRepository.save(productsDetail);
        }

        return order;
    }

    @Override
    public List<Orders> getAllOrdersByStatus( Short status , Integer id ) {
        return this.ordersRepository.getAllOrderByStatus( status , id ) ;
    }

    @Override
    public List<Orders> getAllOrders(Integer id) {
        return this.ordersRepository.getAllOrders(id) ;
    }
    @Override
    public void updateStatusOrder(Integer status, Long id) {
        List<OrderDetails> listOrderDetail = this.orderDetailsRepository.getOrderDetailsByOrder(id);
        for(OrderDetails x : listOrderDetail ){
            Integer a = x.getQuantity() + x.getProductsDetail().getQuantity() ;
            this.productsDetailsRepository.updateSoLuong( a , x.getProductsDetail().getId() );
        }
        this.ordersRepository.updateStatusOrder( status , id );
    }
}
