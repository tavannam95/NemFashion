package nem.com.repository;

import nem.com.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomersRepository extends JpaRepository<Customers, Integer> {

    Optional<Customers> findCustomersByPhone(String phone);

    Optional<Customers> findCustomersByEmail(String email);
}