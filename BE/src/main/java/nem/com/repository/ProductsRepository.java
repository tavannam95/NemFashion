package nem.com.repository;

import nem.com.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

    @Query("SELECT p FROM Products p WHERE p.category.id = :id and p.status = 1")
    List<Products> findByCate(@Param("id") Short id);
}