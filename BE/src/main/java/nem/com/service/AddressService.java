package nem.com.service;

import nem.com.entity.Address;

import java.util.List;

public interface AddressService {
    List<Address> getAll();
    Address getOne(Integer id);
    Address save(Address address);
    void delete(Integer id);
}
