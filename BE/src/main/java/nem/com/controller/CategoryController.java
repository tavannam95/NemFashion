package nem.com.controller;

import nem.com.entity.Categories;
import nem.com.service.impl.CategoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("")
    public ResponseEntity<List<Categories>> getAll(){
        return new ResponseEntity<>(this.categoryService.getAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Categories> create(@RequestBody Categories categories){
        categories.setCreateDate(new Date());
        return new ResponseEntity<>(this.categoryService.save(categories),HttpStatus.OK);
    }
}
