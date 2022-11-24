package nem.com.service;

import nem.com.domain.dto.SearchOrderDTO;
import nem.com.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    List<Orders> getAll();

    Page<Orders> findByStatusOrderByCreateDateDesc(Integer status, Integer page, Integer size);

    Page<Orders> searchOrderByStatus(SearchOrderDTO searchOrderDTO, Integer page, Integer size);

    Page<Orders> searchAllOrder(SearchOrderDTO searchOrderDTO, Integer page, Integer size);
    List<Orders> findByStatus(Integer status);
    Page<Orders> getAllOrderSort(Integer page, Integer size);
    Orders verifyOrCancel(Orders orders, Integer f);

    List<Orders> getOrderGhn();
}
