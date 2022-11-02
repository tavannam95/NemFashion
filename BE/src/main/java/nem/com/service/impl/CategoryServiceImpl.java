package nem.com.service.impl;

import lombok.AllArgsConstructor;
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
    public List<Categories> getAll() {
        return this.categoriesRepository.findAll();
    }

    @Override
    public Categories save(Categories categories) {
        return this.categoriesRepository.save(categories);
    }
}
