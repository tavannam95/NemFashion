package nem.com.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int rating;
    String content;
    int status;
    //1-n,n-1,n-1
}
