package nem.com.service.impl;

import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderServiceOnline;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class OrderServiceOnlineImpl implements OrderServiceOnline {

    private final OrdersRepository ordersRepository;

    public OrderServiceOnlineImpl(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    @Override
    public Orders save(Orders order) {
        order.setFreight(0.0);
        order.setCreateDate(new Timestamp(System.currentTimeMillis()));
        return this.ordersRepository.save(order);
    }

}
