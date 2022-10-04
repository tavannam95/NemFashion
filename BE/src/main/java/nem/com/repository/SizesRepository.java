package nem.com.repository;

import nem.com.entity.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizesRepository extends JpaRepository<Sizes, Integer> {
}