package nem.com.repository;

import nem.com.entity.Orders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query("select o from Orders o where  o.status = :status and o.customer.id = :id order by o.createDate desc ")
    List<Orders> getAllOrderByStatus(@Param("status") Short status  , @Param("id") Integer id ) ;

    @Query("select o from Orders o where o.customer.id = :id order by o.createDate desc")
    List<Orders> getAllOrders( @Param("id") Integer id );

    @Query("select o from Orders o order by o.createDate desc")
    List<Orders> getAllOrderSort(Pageable pageable);

    List<Orders> findByStatusOrderByCreateDateDesc(Integer status, Pageable pageable);

    @Query("Update Orders o set o.status = :status where o.id = :id ")
    @Modifying
    @Transactional
    void updateStatusOrder( @Param("status") Integer status , @Param("id") Long id ) ;

    @Query("SELECT o from Orders o where o.orderCode is not null and o.orderCode <> '' and o.status not in (0,1)")
    List<Orders> getOrderGhn();
}
