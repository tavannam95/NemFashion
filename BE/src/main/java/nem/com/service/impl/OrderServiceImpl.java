package nem.com.service.impl;

import lombok.AllArgsConstructor;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    OrdersRepository ordersRepository;

    @Override
    public List<Orders> findAllOrderByCreateDate() {
        Pageable pageable = PageRequest.of(0,10);
        return this.ordersRepository.findAllOrderByCreateDateAsc(pageable);
    }
}
