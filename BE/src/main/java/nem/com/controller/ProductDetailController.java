package nem.com.controller;

import nem.com.dto.request.ProductDetailsDTO;
import nem.com.entity.ProductsDetails;
import nem.com.service.ProductDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("")
    public ResponseEntity<List<ProductsDetails>> getAll(){
        return new ResponseEntity<>(this.productDetailService.getAll(),HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductsDetails> getOne(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.productDetailService.getOne(id),HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ProductsDetails> update(@RequestBody ProductsDetails productsDetails){
        return new ResponseEntity<>(this.productDetailService.update(productsDetails),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.productDetailService.delete(id);
    }

    @GetMapping("/getByProduct/{id}")
    public ResponseEntity<List<ProductDetailsDTO>> getByIdProduct(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.productDetailService.getByIdProduct(id));
    }
}
