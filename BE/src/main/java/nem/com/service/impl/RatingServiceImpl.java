package nem.com.service.impl;

import nem.com.entity.Ratings;
import nem.com.repository.RatingsRepository;
import nem.com.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
