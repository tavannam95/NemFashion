package nem.com.service;

import nem.com.entity.Colors;
import nem.com.entity.Sizes;

import java.util.List;

public interface ColorService {
    Colors save(Colors colors);

    Colors getOne(Integer id);

    List<Colors> getAll();

    List<Colors> findAllColorInProductDetails(Integer productId);
}
