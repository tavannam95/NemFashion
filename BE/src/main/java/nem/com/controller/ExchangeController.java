package nem.com.controller;

import nem.com.entity.Exchanges;
import nem.com.repository.ExchangesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/exchange")
public class ExchangeController {

    private final ExchangesRepository exchangesRepository;


    public ExchangeController(ExchangesRepository exchangesRepository) {
        this.exchangesRepository = exchangesRepository;
    }

    @PostMapping
    public ResponseEntity<Exchanges> save(@RequestBody Exchanges request) {
        return new ResponseEntity<>(this.exchangesRepository.save(request), HttpStatus.OK);
    }
}
