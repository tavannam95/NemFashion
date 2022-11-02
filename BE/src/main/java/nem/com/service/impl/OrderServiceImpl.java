package nem.com.service.impl;

import com.cloudinary.transformation.BaseExpression;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderServiceImpl implements OrderService {

    OrdersRepository ordersRepository;

    public OrderServiceImpl(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    @Override
    public List<Orders> getAll() {

        return this.ordersRepository.findAll();
    }

    @Override
    public Orders verifyOrCancel(Orders orders, Integer f) {
            orders.setStatus(f);
        this.ordersRepository.save(orders);
        return orders;
    }
}
