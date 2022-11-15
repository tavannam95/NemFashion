package nem.com.repository;

import nem.com.domain.response.CategoryDTO;
import nem.com.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoriesRepository extends JpaRepository<Categories, Short> {

    @Query("select new CategoryDTO(c.id , c.name , count(p.id) ) " +
            "from Categories c join Products p on c.id = p.category.id group by c.id , c.name ")
    List<CategoryDTO> getCategories() ;
}
