package nem.com.service.impl;

import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.data.domain.PageRequest;
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
    public List<Orders> findByStatusOrderByCreateDateDesc(Integer status) {
        return this.ordersRepository.findByStatusOrderByCreateDateDesc(status, PageRequest.of(0,10));
    }

    @Override
    public List<Orders> getAllOrderSort() {
        return this.ordersRepository.getAllOrderSort(PageRequest.of(0,10));
    }

    @Override
    public Orders verifyOrCancel(Orders orders, Integer f) {
            orders.setStatus(f);
        this.ordersRepository.save(orders);
        return orders;
    }

    @Override
    public List<Orders> getOrderGhn() {
        return this.ordersRepository.getOrderGhn();
    }
}
