package nem.com.service.impl;

import nem.com.entity.Categories;
import nem.com.entity.Products;
import nem.com.repository.CategoriesRepository;
import nem.com.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoriesRepository categoriesRepository;

    public CategoryServiceImpl(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    public List<Categories> getAll() {
        return this.categoriesRepository.findAll();
    }

    @Override
    public Categories save(Categories categories) {
        return this.categoriesRepository.save(categories);
    }

}
