package nem.com.controller;

import nem.com.entity.ProductsDetails;
import nem.com.service.ProductDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/productDetail")
public class ProductDetailController {
    private final ProductDetailService productDetailService;

    public ProductDetailController(ProductDetailService productDetailService) {
        this.productDetailService = productDetailService;
    }

    @PostMapping("")
    public ResponseEntity<ProductsDetails> create(@RequestBody ProductsDetails productsDetails){
        return new ResponseEntity<>(this.productDetailService.save(productsDetails), HttpStatus.OK);
    }
}
