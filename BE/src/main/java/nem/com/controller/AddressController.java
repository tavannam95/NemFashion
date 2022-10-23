package nem.com.controller;

import nem.com.entity.Address;
import nem.com.service.impl.AddressServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/address")
public class AddressController {

    private final AddressServiceImpl addressServiceImpl;

    public AddressController(AddressServiceImpl addressServiceImpl) {
        this.addressServiceImpl = addressServiceImpl;
    }

    @GetMapping("")
    public ResponseEntity<List<Address>> getAll(){
        return new ResponseEntity<>(this.addressServiceImpl.getAll(), HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Address> getOne(@PathVariable("id") Integer id){
        return new ResponseEntity<>(this.addressServiceImpl.getOne(id), HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<Address> update(@RequestBody Address address){
        return  new ResponseEntity<>(this.addressServiceImpl.save(address), HttpStatus.OK );
    }
    @PostMapping("")
    public ResponseEntity<Address> create(@RequestBody Address address){
        return new ResponseEntity<>(this.addressServiceImpl.save(address), HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Integer id){
        this.addressServiceImpl.delete(id);
    }
}
