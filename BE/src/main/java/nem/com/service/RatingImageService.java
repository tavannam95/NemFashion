package nem.com.service;

import nem.com.entity.RatingImages;

import java.util.List;

public interface RatingImageService {

    RatingImages createRatingImage( RatingImages ratingImages );

    List<RatingImages> getAll() ;
}
