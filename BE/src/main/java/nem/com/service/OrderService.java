package nem.com.service;

import nem.com.entity.Orders;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    List<Orders> getAll();

    Page<Orders> findByStatusOrderByCreateDateDesc(Integer status);
    Page<Orders> getAllOrderSort(Integer page, Integer size);
    Orders verifyOrCancel(Orders orders, Integer f);

    List<Orders> getOrderGhn();
}
