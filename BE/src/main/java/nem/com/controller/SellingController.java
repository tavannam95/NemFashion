package nem.com.controller;

import nem.com.dto.request.SellingDTO;
import nem.com.dto.request.ServiceResult;
import nem.com.service.SellingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/selling")
public class SellingController {
    private final SellingService sellingService;

    public SellingController(SellingService sellingService){
        this.sellingService =sellingService;

    }

    @PostMapping("/payment")
    public ResponseEntity<?> payment(@RequestBody SellingDTO sellingDTO){
        ServiceResult<?> result = sellingService.selling(sellingDTO);
        return ResponseEntity.ok(result);
    }
}
