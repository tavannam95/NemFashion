package nem.com.service.impl;

import lombok.RequiredArgsConstructor;
import nem.com.entity.OrderDetails;
import nem.com.repository.OrderDetailsRepository;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderDetailOnlineService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderDetailOnlineServiceImpl implements OrderDetailOnlineService {

    private final OrderDetailsRepository orderDetailsRepository;

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    public OrderDetails save(OrderDetails request) {
        return this.orderDetailsRepository.save(request);
    }
}
