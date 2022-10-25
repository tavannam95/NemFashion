package nem.com.repository;

import nem.com.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

    @Query("select p from Products p where p.id in ( select pb.product.id from ProductsDetails pb where pb.size.id in (:size) )")
    List<Products> findProBySize(@Param("size") Integer[] size ) ;
}