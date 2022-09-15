package nem.com.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "rating_images")
public class RatingImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    //n-1
}
