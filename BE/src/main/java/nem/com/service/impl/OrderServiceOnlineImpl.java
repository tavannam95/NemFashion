package nem.com.service.impl;

import nem.com.entity.OrderDetails;
import nem.com.entity.Orders;
import nem.com.entity.Products;
import nem.com.entity.ProductsDetails;
import nem.com.repository.OrderDetailsRepository;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderServiceOnline;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class OrderServiceOnlineImpl implements OrderServiceOnline {

    private final OrdersRepository ordersRepository;
    private final OrderDetailsRepository orderDetailsRepository ;
    private final ProductsDetailsRepository productsDetailsRepository ;

    public OrderServiceOnlineImpl(OrdersRepository ordersRepository , OrderDetailsRepository repository , ProductsDetailsRepository productsDetailsRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailsRepository = repository ;
        this.productsDetailsRepository = productsDetailsRepository ;
    }



    @Override
    public Orders save(Orders order) {
        order.setCreateDate(new Timestamp(System.currentTimeMillis()));
        return this.ordersRepository.save(order);
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
    public void updateStatusOrder(Short status, Long id) {
        List<OrderDetails> listOrderDetail = this.orderDetailsRepository.getOrderDetailsByOrder(id);
        for(OrderDetails x : listOrderDetail ){
            Integer a = x.getQuantity() + x.getProductsDetail().getQuantity() ;
            this.productsDetailsRepository.updateSoLuong( a , x.getProductsDetail().getId() );
        }
        this.ordersRepository.updateStatusOrder( status , id );
    }


}
