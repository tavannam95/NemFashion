package nem.com.service.impl;

import nem.com.dto.request.SearchDTO;
import nem.com.dto.response.BuyMostProductDTO;
import nem.com.dto.response.CustomerBuyMostProductDTO;
import nem.com.dto.response.OverviewStatisticalDTO;
import nem.com.dto.response.TurnoverDTO;
import nem.com.domain.dto.SearchOrderDTO;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
    public List<CustomerBuyMostProductDTO> CustomerBuyMostProduct( SearchDTO request) {
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

    @Override
    public List<TurnoverDTO> turnoverDTO(SearchDTO request) {
        String type ;
        if( request.getType() == 1 ){
            type = "%Y" ;
        }else if( request.getType() == 2 ){
            type = "%m-%Y" ;
        }else {
            type = "%d-%m-%Y" ;
        }
        System.out.println(request.getStartDate());
        System.out.println(request.getEndDate());
        return this.ordersRepository.turnoverDTO( request.getStartDate() , request.getEndDate() , type );
    }

    public List<Orders> getOrderGhn() {
        return this.ordersRepository.getOrderGhn();
    }
}
