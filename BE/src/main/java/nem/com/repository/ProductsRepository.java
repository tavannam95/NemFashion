package nem.com.repository;

import nem.com.entity.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductsRepository extends JpaRepository<Products, Integer> {
    @Query("select p from Products p where p.id in " +
            "( select pb.product.id from ProductsDetails pb where pb.size.id in (:size) and pb.color.id in (:color) ) " +
            " and p.category.id in (:category) and p.price between :min and :max")
    Page<Products> findProByAllProperty(@Param("size") Integer[] size , @Param("category") Short[] category ,
                                        @Param("color") Integer[] color , @Param("max") Double max ,
                                        @Param("min") Double min , Pageable pageable)   ;


    @Query("select p from Products p order by p.createDate desc ")
    List<Products> findNewPro() ;
}