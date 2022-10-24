package nem.com.controller;

import lombok.RequiredArgsConstructor;
import nem.com.entity.Carts;
import nem.com.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<Carts> addToCart(@RequestBody Carts request) {
        return new ResponseEntity<>(this.cartService.addToCart(request), HttpStatus.OK);
    }

    @GetMapping("{customerId}")
    public ResponseEntity<List<Carts>> addToCart(@PathVariable Integer customerId) {
        return new ResponseEntity<>(this.cartService.findAllByCustomerId(customerId), HttpStatus.OK);
    }

}
