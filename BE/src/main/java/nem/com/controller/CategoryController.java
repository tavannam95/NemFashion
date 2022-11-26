package nem.com.controller;

import nem.com.domain.response.CategoryDTO;
import nem.com.entity.Categories;
import nem.com.service.CategoryService;
import nem.com.service.impl.CategoryServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("")
    public ResponseEntity<List<CategoryDTO>> getAll(){
        return new ResponseEntity<>(this.categoryService.getAll(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Categories> create(@RequestBody Categories categories){
        categories.setCreateDate(new Date());
        return new ResponseEntity<>(this.categoryService.save(categories),HttpStatus.OK);
    }

}
