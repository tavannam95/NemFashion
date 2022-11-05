package nem.com.repository;

import nem.com.entity.Orders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query("SELECT o FROM Orders o ORDER BY o.createDate DESC")
    List<Orders> findAllOrderByCreateDateAsc(Pageable pageable);
}
