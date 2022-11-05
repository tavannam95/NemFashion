package nem.com.controller;

import lombok.AllArgsConstructor;
import nem.com.entity.Orders;
import nem.com.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/order")
@AllArgsConstructor
public class OrderController {

    OrderService orderService;

    @GetMapping("")
    public ResponseEntity<List<Orders>> findAllOrderByCreateDate(){
        return new ResponseEntity<>(this.orderService.findAllOrderByCreateDate(), HttpStatus.OK);
    }
}
