package nem.com.service;

import nem.com.entity.Customers;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Customers get(Integer id);

    List<Customers> getAll();

    Customers save(Customers customers);

    Customers update(Customers customers);

    void delete(Integer id);
}
