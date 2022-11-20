package nem.com.repository;

import nem.com.dto.response.CategoryDTO;
import nem.com.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriesRepository extends JpaRepository<Categories, Short> {

    @Query("select new CategoryDTO(c.id , c.name , count(p.id) ) " +
            "from Categories c join Products p on c.id = p.category.id " +
            " where p.id in ( select pd.product.id from  ProductsDetails pd " +
            " where  pd.color.id is not null and pd.size.id is not null)"  +
            " group by c.id , c.name ")
    List<CategoryDTO> getCategories() ;
}