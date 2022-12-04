package nem.com.repository;

import nem.com.entity.Discounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DiscountsRepository extends JpaRepository<Discounts , Integer> {

    @Transactional
    @Modifying
    @Query("update Products p set p.discount = :discount where p.id in (:id)")
    void updateDiscountProduct(@Param("discount") Integer discount , @Param("id") Integer[] id );

    @Query("select d from Discounts d where d.status = 1 ")
    List<Discounts> findDiscountsByStatus() ;
}
