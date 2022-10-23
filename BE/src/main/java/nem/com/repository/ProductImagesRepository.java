package nem.com.repository;

import nem.com.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductImagesRepository extends JpaRepository<ProductImages, Integer> {

    @Query("select p from ProductImages p where p.product.id = :id")
    List<ProductImages> findAllImageByProID(@Param("id") Integer id ) ;
}