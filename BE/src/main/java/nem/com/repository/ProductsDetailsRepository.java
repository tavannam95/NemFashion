package nem.com.repository;

import nem.com.entity.ProductsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsDetailsRepository extends JpaRepository<ProductsDetails, Integer>,ProductDetailsCustomRepository {
    @Query("SELECT pd FROM ProductsDetails pd WHERE pd.product.id = :id")
    public List<ProductsDetails> getByIdProduct(@Param("id") Integer id);

}