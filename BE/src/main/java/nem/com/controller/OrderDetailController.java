package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.entity.OrderDetails;
import nem.com.service.OrderDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/orderDetail")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderDetails>> getByOrderId(@PathVariable("orderId") Long orderId){
        return new ResponseEntity<>(this.orderDetailService.findByOrderId(orderId), HttpStatus.OK);
    }
}
