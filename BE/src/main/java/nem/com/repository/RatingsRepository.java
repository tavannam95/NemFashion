package nem.com.repository;

import nem.com.entity.Products;
import nem.com.entity.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingsRepository extends JpaRepository<Ratings, Long> {
    @Query(value = " select * from ratings r where  r.order_id in ( select o.id from orders o where o.customer_id = :id and o.status = 1 )" ,nativeQuery = true)
    List<Ratings> getAllRatingByIdCustome(@Param("id") Integer id ) ;
}