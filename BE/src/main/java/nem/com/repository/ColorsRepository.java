package nem.com.repository;

import nem.com.entity.Colors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ColorsRepository extends JpaRepository<Colors, Integer> {
    @Query("select c from Colors c where c.id in (select p.color.id from  ProductsDetails p where p.product.id = :productId)")
    List<Colors> findAllColorInProductDetails(@Param("productId") Integer productId);
}