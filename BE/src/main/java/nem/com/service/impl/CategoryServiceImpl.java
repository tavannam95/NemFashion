package nem.com.service.impl;

import lombok.AllArgsConstructor;
import nem.com.dto.response.CategoryDTO;
import nem.com.entity.Categories;
import nem.com.repository.CategoriesRepository;
import nem.com.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoriesRepository categoriesRepository;

    @Override
    public List<CategoryDTO> getAll() {
        return this.categoriesRepository.getCategories();
    }

    @Override
    public Categories save(Categories categories) {
        return this.categoriesRepository.save(categories);
    }
}
