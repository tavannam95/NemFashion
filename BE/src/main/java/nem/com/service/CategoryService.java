package nem.com.service;

import nem.com.domain.response.CategoryDTO;
import nem.com.entity.Categories;

import java.util.List;
public interface CategoryService {
    List<CategoryDTO> getAll();
    Categories save(Categories categories);


}
