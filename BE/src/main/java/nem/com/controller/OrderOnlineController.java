package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.dto.request.OrderDTO;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/order-online")
@RequiredArgsConstructor
public class OrderOnlineController {

    private final OrderServiceOnline orderOnlineService;
    private final OrderDetailOnlineService orderDetailOnlineService;
    private final ProductsDetailsRepository productsDetailsRepository;

    @Transactional(rollbackFor = RuntimeException.class)
    @PostMapping
    public Orders checkOut(@RequestBody OrderDTO request) {

        if (request.getListCarts() == null || request.getListCarts().isEmpty() || request.getListCarts().size() == 0) {
            throw new IsEmptyException("List cart is empty !");
        }

//        for (Carts cart : request.getListCarts()) {
//            if (cart.getQuantity() > cart.getProductsDetail().getQuantity()) {
//                throw new LimitQuantityException("Số lượng không đủ. Vui lòng cập nhật lại số lượng trong giỏ hàng !");
//            }
//        }
        Orders order = this.orderOnlineService.save(request.getOrder());
        for (Carts cart : request.getListCarts()) {
            OrderDetails orderDetail = new OrderDetails();
            ProductsDetails productsDetail = this.productsDetailsRepository.findById(cart.getProductsDetail().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Id not found " + cart.getProductsDetail().getId()));

            orderDetail.setOrder(order);
            orderDetail.setProductsDetail(productsDetail);
            orderDetail.setQuantity(cart.getQuantity());
            orderDetail.setDiscount(0.0);
            orderDetail.setUnitprice(cart.getQuantity() * cart.getProductsDetail().getProduct().getPrice());
            orderDetail.setStatus(1);

            if (cart.getQuantity() > productsDetail.getQuantity()) {
                throw new LimitQuantityException("Số lượng không đủ. Vui lòng cập nhật lại số lượng trong giỏ hàng !");
            }
            this.orderDetailOnlineService.save(orderDetail);
            productsDetail.setQuantity(productsDetail.getQuantity() - cart.getQuantity());
            this.productsDetailsRepository.save(productsDetail);
        }

        return order;
    }

    @GetMapping()
    public ResponseEntity<List<Orders>> GetAllOrdersByStatus( @RequestParam("status") Short status ,@RequestParam("id") Integer id ){
        return ResponseEntity.ok( this.orderOnlineService.getAllOrdersByStatus( status  , id ) );
    }

    @GetMapping("getAll")
    public ResponseEntity<List<Orders>> getAllOrders( @RequestParam("id") Integer id ){
        return ResponseEntity.ok( this.orderOnlineService.getAllOrders(id) );
    }

    @GetMapping("updateStatus")
    public void updateStatusOrder( @RequestParam("status") Integer status , @RequestParam("id") Long id ) {
        this.orderOnlineService.updateStatusOrder( status , id );
    }
}
