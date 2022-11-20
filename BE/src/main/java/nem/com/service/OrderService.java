package nem.com.service;

import nem.com.dto.request.SearchDTO;
import nem.com.dto.response.BuyMostProductDTO;
import nem.com.dto.response.CustomerBuyMostProductDTO;
import nem.com.dto.response.OverviewStatisticalDTO;
import nem.com.entity.Orders;
import java.util.List;

public interface OrderService {
    List<Orders> getAll();

    List<Orders> findByStatusOrderByCreateDateDesc(Integer status);
    List<Orders> getAllOrderSort();
    Orders verifyOrCancel(Orders orders, Integer f);

    List<CustomerBuyMostProductDTO> CustomerBuyMostProduct( SearchDTO request) ;

    OverviewStatisticalDTO getOverview() ;

     List<BuyMostProductDTO> BuyMostProductDTO(SearchDTO request ) ;
}
