package nem.com.repository;

import nem.com.dto.response.CategoryDTO;
import nem.com.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriesRepository extends JpaRepository<Categories, Short> {

    @Query("select new CategoryDTO(c.id , c.name , sum(pd.quantity) ) " +
            "from Categories c left join Products p on c.id = p.category.id " +
            " left join ProductsDetails pd on pd.product.id = p.id group by c.id , c.name ")
    List<CategoryDTO> getCategories() ;
}