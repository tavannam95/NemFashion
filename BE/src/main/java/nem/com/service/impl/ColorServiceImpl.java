package nem.com.service.impl;

import nem.com.entity.Colors;
import nem.com.repository.ColorsRepository;
import nem.com.service.ColorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService{
    private final ColorsRepository colorsRepository;

    public ColorServiceImpl(ColorsRepository colorsRepository) {
        this.colorsRepository = colorsRepository;
    }

    @Override
    public Colors save(Colors colors) {
        return this.colorsRepository.save(colors);
    }

    @Override
    public Colors getOne(Integer id) {
        return this.colorsRepository.findById(id).get();
    }

    @Override
    public List<Colors> getAll() {
        return this.colorsRepository.findAll();
    }
}