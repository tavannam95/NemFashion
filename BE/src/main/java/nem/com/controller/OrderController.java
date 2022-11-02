package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.entity.Orders;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final ProductsDetailsRepository productsDetailsRepository;

    @GetMapping("")
    public List<Orders> getAll(){
        return this.orderService.getAll();
    }
}
