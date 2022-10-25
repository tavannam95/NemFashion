package nem.com.controller;

import nem.com.entity.Products;
import nem.com.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public ResponseEntity<List<Products>> getAll(){
        return new ResponseEntity<>(this.productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getOne(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.productService.getOne(id),HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Products> create(@RequestBody Products products){
        products.setCreateDate(new Date());
        products.setStatus(1);
        return new ResponseEntity<>(this.productService.save(products),HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Products> update(
            @PathVariable("id") Integer id,
            @RequestBody Products products
    ){
        products.setUpdateDate(new Date());
        return new ResponseEntity<>(this.productService.update(products),HttpStatus.OK);
    }

    @GetMapping("findSize")
    public ResponseEntity<List<Products>> findProBySize( @RequestParam("size") Integer[] sizes){
        return new ResponseEntity<>(this.productService.getAllBySize(sizes) , HttpStatus.OK );
    }

}
