package nem.com.service;

import nem.com.entity.Categories;
import org.springframework.stereotype.Service;

import java.util.List;
public interface CategoryService {
    List<Categories> getAll();
    Categories save(Categories categories);
}
