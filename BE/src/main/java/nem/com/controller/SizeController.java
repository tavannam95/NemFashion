package nem.com.controller;

import nem.com.entity.Sizes;
import nem.com.service.SizeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/size")
public class SizeController {
    private final SizeService sizeService;

    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @GetMapping("")
    public ResponseEntity<List<Sizes>> getAll(){
        return new ResponseEntity<>(this.sizeService.getAll(),HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Sizes> getOne(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.sizeService.getOne(id),HttpStatus.OK);
    }
}
