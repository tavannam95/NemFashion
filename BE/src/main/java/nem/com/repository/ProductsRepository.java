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

    @Query(value = "select distinct  p.*  from products p join products_details pd on p.id = pd.product_id\n" +
            "                        join order_details od  on od.product_detail_id = pd.id \n" +
            "                        join orders o on o.id = od.order_id \n" +
            "                        where o.status = 1\n" +
            "                        group by p.id\n" +
            "                        order by sum(od.quantity) desc \n" +
            "\t\t\t\t\t    limit 0 , 10 " , nativeQuery = true)
    List<Products> findTop10Product() ;

    @Query(value = "select * from products order by create_date desc limit 0 , 10 ;" , nativeQuery = true)
    List<Products> findTop10NewProduct();

    @Query("select p from Products p order by p.createDate desc ")
    List<Products> findNewPro() ;

    @Query(value = "select p.* from products p where p.id in \n" +
            "( select pd.product_id from products_details pd \n" +
            "join order_details od on pd.id = od.product_detail_id where od.order_id = :id\n" +
            " ) and p.id not in ( select r.product_id from ratings r where r.order_id = :id) " , nativeQuery = true)
    List<Products> findProductNeverRating( @Param("id") Long id );

}