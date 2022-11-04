package nem.com.repository;

import nem.com.dto.response.RatingAvgDTO;
import nem.com.dto.response.RatingProductDTO;
import nem.com.entity.Ratings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingsRepository extends JpaRepository<Ratings, Long> {
    @Query(value = " select * from ratings r where  r.order_id in ( select o.id from orders o where o.customer_id = :id and o.status = 1 )" ,nativeQuery = true)
    List<Ratings> getAllRatingByIdCustome(@Param("id") Integer id ) ;

    @Query("select new RatingAvgDTO(r.product.id , floor(avg(r.rating) ) ) from Ratings r group by r.product.id")
    List<RatingAvgDTO> getAvgRating() ;

    @Query("select new RatingProductDTO( r.id , r.content , r.rating , r.orders.customer.fullname , r.createDate ) from Ratings r where r.product.id = :idPro")
    Page<RatingProductDTO> getRatingProduct(@Param("idPro") Integer idPro , Pageable pageable ) ;

}