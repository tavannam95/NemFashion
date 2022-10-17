package nem.com.controller;

import nem.com.entity.Colors;
import nem.com.service.ColorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/color")
public class ColorController {
    private final ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }

    @PostMapping("")
    public ResponseEntity<Colors> create(@RequestBody Colors colors){
        return new ResponseEntity<>(this.colorService.save(colors), HttpStatus.OK);
    }
}
