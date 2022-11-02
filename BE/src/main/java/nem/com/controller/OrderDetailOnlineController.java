package nem.com.controller;

import nem.com.entity.OrderDetails;
import nem.com.service.OrderDetailOnlineService;
import org.hibernate.criterion.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("")
    public ResponseEntity<List<OrderDetails>> GetOrderDetailByOrder( @RequestParam("id") Integer id ){
        return ResponseEntity.ok(this.orderDetailOnlineService.findAllOrderDetail(id)  ) ;
    }

    @GetMapping("getByCusAndOrder")
    public ResponseEntity<List<OrderDetails>> getOrderDetailByCustomeAndOrder( @RequestParam("idCus") Integer idCus , @RequestParam("idOrder") Long idOrder) {
        return ResponseEntity.ok( this.orderDetailOnlineService.findAllOrderDetailByCustomeAndOrder( idOrder , idCus )) ;
    }

}
