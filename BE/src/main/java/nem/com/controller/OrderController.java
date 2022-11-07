package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.dto.response.OrderResponseDTO;
import nem.com.entity.OrderDetails;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderDetailService;
import nem.com.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final OrderDetailService orderDetailService;
    private final OrdersRepository ordersRepository;
    private final ProductsDetailsRepository productsDetailsRepository;

    @GetMapping("")
    public ResponseEntity<List<OrderResponseDTO>> getAll(){
        List<OrderResponseDTO> orderResponseDTOList = new ArrayList<>();
        List<Orders> ordersList = this.orderService.getAllOrderSort();
        for (Orders orders: ordersList
             ) {
            OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
            orderResponseDTO.setOrders(orders);
            List<OrderDetails> orderDetailsList = this.orderDetailService.findByOrderId(orders.getId());
            orderResponseDTO.setOrderDetailsList(orderDetailsList);
            orderResponseDTOList.add(orderResponseDTO);
        }
        return new ResponseEntity<>(orderResponseDTOList,HttpStatus.OK);
    }

    @GetMapping("/{status}")
    public ResponseEntity<List<OrderResponseDTO>> findByStatus(@PathVariable("status") Integer status){
        List<OrderResponseDTO> orderResponseDTOList = new ArrayList<>();
        List<Orders> ordersList = this.orderService.findByStatusOrderByCreateDateDesc(status);
        for (Orders orders: ordersList
        ) {
            OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
            orderResponseDTO.setOrders(orders);
            List<OrderDetails> orderDetailsList = this.orderDetailService.findByOrderId(orders.getId());
            orderResponseDTO.setOrderDetailsList(orderDetailsList);
            orderResponseDTOList.add(orderResponseDTO);
        }
        return new ResponseEntity<>(orderResponseDTOList,HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{status}")
    public ResponseEntity<Orders> updateStatus(@PathVariable("status") Integer status, @RequestBody Orders orders){
        orders.setStatus(1);
        return new ResponseEntity<>(this.orderService.verifyOrCancel(orders,status),HttpStatus.OK);
    }
}
