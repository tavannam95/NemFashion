package nem.com.controller;

import nem.com.service.OrderDetailOnlineService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/order-detail-online")
public class OrderDetailOnlineController {

    private final OrderDetailOnlineService orderDetailOnlineService;

    public OrderDetailOnlineController(OrderDetailOnlineService orderDetailOnlineService) {
        this.orderDetailOnlineService = orderDetailOnlineService;
    }
//
//    @PostMapping
//    public ResponseEntity<OrderDetails> save(@RequestBody OrderDetailDTO request) {
//        return new ResponseEntity<>(this.orderDetailOnlineService.save(request), HttpStatus.OK);
//    }

}
