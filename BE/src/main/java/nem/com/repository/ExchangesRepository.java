package nem.com.repository;

import nem.com.entity.Exchanges;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangesRepository extends JpaRepository<Exchanges, Integer> {
}