package nem.com.service.impl;

import nem.com.entity.Sizes;
import nem.com.repository.SizesRepository;
import nem.com.service.SizeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {
    private final SizesRepository sizesRepository;

    public SizeServiceImpl(SizesRepository sizesRepository) {
        this.sizesRepository = sizesRepository;
    }


    @Override
    public List<Sizes> getAll() {
        return this.sizesRepository.findAll();
    }

    @Override
    public Sizes getOne(Integer id) {
        return this.sizesRepository.findById(id).get();
    }
}
