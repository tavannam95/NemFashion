package nem.com.repository;

import nem.com.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartsRepository extends JpaRepository<Carts, Integer> {
}