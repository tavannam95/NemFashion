package nem.com.service.impl;

import nem.com.dto.request.SearchDTO;
import nem.com.dto.response.BuyMostProductDTO;
import nem.com.dto.response.CustomerBuyMostProductDTO;
import nem.com.dto.response.OverviewStatisticalDTO;
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
    public List<CustomerBuyMostProductDTO> CustomerBuyMostProduct(SearchDTO request) {
        return this.ordersRepository.CustomerBuyMostProduct( request.getStartDate() , request.getEndDate() ) ;
    }

    @Override
    public OverviewStatisticalDTO getOverview() {
        return this.ordersRepository.getOverview() ;
    }

    @Override
    public List<BuyMostProductDTO> BuyMostProductDTO(SearchDTO request) {
        return this.ordersRepository.buyMostProductDTO( request.getStartDate() , request.getEndDate()) ;
    }
}
