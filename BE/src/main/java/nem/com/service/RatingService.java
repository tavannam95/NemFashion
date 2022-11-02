package nem.com.service;

import nem.com.entity.Ratings;

import java.util.List;

public interface RatingService {

    List<Ratings> getAllRatingByCustom( Integer id ) ;

    Ratings createRating( Ratings ratings ) ;
}
