package nem.com.service.impl;

import nem.com.domain.dto.SearchOrderDTO;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.data.domain.Page;
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
    public Page<Orders> findByStatusOrderByCreateDateDesc(Integer status, Integer page, Integer size) {
        return this.ordersRepository.findByStatusOrderByCreateDateDesc(status, PageRequest.of(page,size));
    }

    @Override
    public Page<Orders> searchOrderByStatus(SearchOrderDTO searchOrderDTO, Integer page, Integer size) {
        return this.ordersRepository.searchOrderByStatus(searchOrderDTO.getFullName(),
                searchOrderDTO.getId(),searchOrderDTO.getOrderCode(),
                searchOrderDTO.getStatus(),PageRequest.of(page,size));
    }

    @Override
    public Page<Orders> searchAllOrder(SearchOrderDTO searchOrderDTO, Integer page, Integer size) {
        return this.ordersRepository.searchAllOrder(searchOrderDTO.getFullName(),
                searchOrderDTO.getId(),searchOrderDTO.getOrderCode(),PageRequest.of(page,size));
    }

    @Override
    public List<Orders> findByStatus(Integer status) {
        return this.ordersRepository.findByStatus(status);
    }

    @Override
    public Page<Orders> getAllOrderSort(Integer page, Integer size) {
        return this.ordersRepository.getAllOrderSort(PageRequest.of(page,size));
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
