package nem.com.service;

import nem.com.dto.response.CategoryDTO;
import nem.com.entity.Categories;
import org.springframework.stereotype.Service;

import java.util.List;
public interface CategoryService {
    List<CategoryDTO> getAll();
    Categories save(Categories categories);


}
