package nem.com.service.impl;

import lombok.RequiredArgsConstructor;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    OrdersRepository ordersRepository;

    @Override
    public List<Orders> getAll() {
        return this.ordersRepository.findAll();
    }
}
