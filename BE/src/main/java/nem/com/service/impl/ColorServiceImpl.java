package nem.com.service.impl;

import nem.com.entity.Colors;
import nem.com.repository.ColorsRepository;
import nem.com.service.ColorService;
import org.springframework.stereotype.Service;

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
}
