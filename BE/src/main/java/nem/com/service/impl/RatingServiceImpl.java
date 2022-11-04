package nem.com.service.impl;

import nem.com.dto.response.RatingAvgDTO;
import nem.com.dto.response.RatingProductDTO;
import nem.com.entity.Ratings;
import nem.com.repository.RatingsRepository;
import nem.com.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingsRepository ratingsRepository ;

    public RatingServiceImpl( RatingsRepository ratingsRepository ){
        this.ratingsRepository = ratingsRepository ;
    }

    @Override
    public List<Ratings> getAllRatingByCustom(Integer id) {
        return this.ratingsRepository.getAllRatingByIdCustome( id);
    }

    @Override
    public Ratings createRating(Ratings ratings) {
        return this.ratingsRepository.save(ratings);
    }

    @Override
    public List<RatingAvgDTO> getAvgRating() {
        return this.ratingsRepository.getAvgRating();
    }

    @Override
    public Page<RatingProductDTO> getRatingPro(Integer id , Pageable pageable ) {
        return this.ratingsRepository.getRatingProduct(id , pageable );
    }
}
