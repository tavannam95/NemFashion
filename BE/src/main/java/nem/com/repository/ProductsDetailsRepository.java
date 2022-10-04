package nem.com.repository;

import nem.com.entity.ProductsDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsDetailsRepository extends JpaRepository<ProductsDetails, Integer> {
}