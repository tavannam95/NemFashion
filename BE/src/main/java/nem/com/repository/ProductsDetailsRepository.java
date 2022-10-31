package nem.com.repository;

import nem.com.entity.ProductsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsDetailsRepository extends JpaRepository<ProductsDetails, Integer> {
    @Query("select p from ProductsDetails p where  p.product.id = :id")
    List<ProductsDetails> findProductsDetailsByProductId(@Param("id") Integer productId);

    @Query("SELECT p FROM ProductsDetails p WHERE p.product.id = :productId AND p.color.id = :colorId AND p.size.id = :sizeId")
    List<ProductsDetails> findProductDetailByProductSizeColor(Integer productId, Integer colorId, Integer sizeId);

    @Query("select p from ProductsDetails p where p.product.id = :productId and p.size.id = :sizeId and p.color.id = :colorId")
    ProductsDetails findProductDetailBySizeAndColor(@Param("productId") Integer productId, @Param("sizeId") Integer sizeId, @Param("colorId") Integer colorId);

}
