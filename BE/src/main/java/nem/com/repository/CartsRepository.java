package nem.com.repository;

import nem.com.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartsRepository extends JpaRepository<Carts, Integer> {

    @Query("select c from Carts c where c.customer.id = :customerId")
    List<Carts> findCartsByCustomerId(@Param("customerId") Integer customerId);

    @Query("select c from Carts c where c.productsDetail.id = :productDetailId and c.customer.id = :customerId")
    Carts findCartsByProductDetailAndCustomer(@Param("productDetailId") Integer productDetailId, @Param("customerId") Integer customerId);

}