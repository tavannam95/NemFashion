package nem.com.controller;


import nem.com.domain.request.ProductDetailsDTO;
//import nem.com.dto.response.ProductViewDto;
import nem.com.domain.response.ProductDetailResponseDTO;
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


    @GetMapping("detail/{productId}")
    public ResponseEntity<List<ProductsDetails>> findProductsDetailsByProductId(@PathVariable("productId") Integer productId) {
        return new ResponseEntity<>(this.productDetailService.findProductsDetailsByProductId(productId), HttpStatus.OK);
    }

    @GetMapping("p-detail")
    public ResponseEntity<ProductsDetails> findProductDetailBySizeAndColor(Integer productId, Integer sizeId, Integer colorId) {
        return new ResponseEntity<>(this.productDetailService.findProductDetailBySizeAndColor(
                productId, sizeId, colorId), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<ProductsDetails>> getAll() {
        return new ResponseEntity<>(this.productDetailService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsDetails> getOne(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.productDetailService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ProductsDetails>> getProductDetailById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(this.productDetailService.findProductsDetailsByProductId(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<List<ProductDetailResponseDTO>> create(@RequestBody List<ProductDetailResponseDTO> listProductViewDto){
        return new ResponseEntity<>(this.productDetailService.createProductDetails(listProductViewDto),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductsDetails> update(@RequestBody ProductsDetails productsDetails) {
        return new ResponseEntity<>(this.productDetailService.update(productsDetails), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        this.productDetailService.delete(id);
    }

    @GetMapping("/getByProduct/{id}")
    public ResponseEntity<List<ProductDetailsDTO>> getByIdProduct(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.productDetailService.getByIdProduct(id));
    }

    @GetMapping("/getByBarcode/{barcode}")
    public ResponseEntity<ProductsDetails> getByBarcode(@PathVariable("barcode") String barcode){
        return ResponseEntity.ok(this.productDetailService.getByBarcode(barcode));
    }
}
