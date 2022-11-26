package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.domain.request.OrderDTO;
import nem.com.entity.Carts;
import nem.com.entity.OrderDetails;
import nem.com.entity.Orders;
import nem.com.entity.ProductsDetails;
import nem.com.exception.IsEmptyException;
import nem.com.exception.LimitQuantityException;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderDetailOnlineService;
import nem.com.service.OrderServiceOnline;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/order-online")
@RequiredArgsConstructor
public class OrderOnlineController {

    private final OrderServiceOnline orderOnlineService;

    @PostMapping
    public ResponseEntity<?> checkOut(@RequestBody OrderDTO request) {
        return new ResponseEntity<>(orderOnlineService.checkout(request), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Orders>> GetAllOrdersByStatus(@RequestParam("status") Short status, @RequestParam("id") Integer id) {
        return ResponseEntity.ok(this.orderOnlineService.getAllOrdersByStatus(status, id));
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Orders>> getAllOrders(@RequestParam("id") Integer id) {
        return ResponseEntity.ok(this.orderOnlineService.getAllOrders(id));
    }

    @GetMapping("updateStatus")
    public void updateStatusOrder(@RequestParam("status") Integer status, @RequestParam("id") Long id) {
        this.orderOnlineService.updateStatusOrder(status, id);
    }
}
