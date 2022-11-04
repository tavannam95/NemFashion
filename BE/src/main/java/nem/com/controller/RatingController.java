package nem.com.controller;

import nem.com.dto.response.RatingAvgDTO;
import nem.com.dto.response.RatingProductDTO;
import nem.com.entity.Products;
import nem.com.entity.Ratings;
import nem.com.service.RatingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("getAvgRating")
    public ResponseEntity<List<RatingAvgDTO>> getAvgRating( ){
        return ResponseEntity.ok( this.ratingService.getAvgRating());
    }

    @GetMapping("getRatingPro")
    public ResponseEntity<Page<RatingProductDTO>> getRatingPro( @RequestParam("idPro") Integer idPro ,
                                                                @RequestParam("pageNo") Optional<Integer> pageNo ){
        Pageable pageable = PageRequest.of( pageNo.orElse(0) , 6 ) ;

        Page<RatingProductDTO> page =  this.ratingService.getRatingPro(idPro , pageable );

        return new ResponseEntity<>(page , HttpStatus.OK) ;
    }

}
