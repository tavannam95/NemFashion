package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.entity.Orders;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrdersRepository ordersRepository;
    private final ProductsDetailsRepository productsDetailsRepository;

    @GetMapping("")
    public ResponseEntity<List<Orders>> getAll(){
        return new ResponseEntity<>(this.orderService.getAll(), HttpStatus.OK);
    }
    @PutMapping("/verify/{id}")
    public ResponseEntity<Orders> verify(@PathVariable("id") Long id){
        Orders orders = this.ordersRepository.findById(id).get();
        return new ResponseEntity<>(this.orderService.verify(orders),HttpStatus.OK);
    }
}
