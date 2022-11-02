package nem.com.controller;

import nem.com.entity.Ratings;
import nem.com.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/rating")
public class RatingController {

    private final RatingService ratingService ;

    public RatingController( RatingService ratingService ){
        this.ratingService = ratingService ;
    }

    @GetMapping("")
    public ResponseEntity<List<Ratings>> getAllRatingByCustome(@RequestParam("id") Integer id ){
        return ResponseEntity.ok( this.ratingService.getAllRatingByCustom(id) );
    }

    @PostMapping("")
    public ResponseEntity<Ratings> createRating( @RequestBody Ratings ratings ){

        return ResponseEntity.ok(this.ratingService.createRating(ratings));
    }
}
