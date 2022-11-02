package nem.com.service;

import nem.com.entity.Orders;

import java.util.List;

public interface OrderServiceOnline {

    Orders save(Orders order);

    List<Orders> getAllOrdersByStatus( Short status , Integer id ) ;

    List<Orders> getAllOrders( Integer id ) ;

    void updateStatusOrder( Short status , Long id ) ;
}
