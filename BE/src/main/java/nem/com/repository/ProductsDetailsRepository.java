package nem.com.repository;

import nem.com.entity.ProductsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductsDetailsRepository extends JpaRepository<ProductsDetails, Integer> {
    @Query("SELECT p FROM ProductsDetails p WHERE p.product.id = :id")
    List<ProductsDetails> getProductsDetailsById(Integer id);
}
