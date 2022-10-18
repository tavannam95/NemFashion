package nem.com.service;

import nem.com.entity.Colors;

import java.util.List;

public interface ColorService {
    Colors save(Colors colors);

    Colors getOne(Integer id);

    List<Colors> getAll();
}
