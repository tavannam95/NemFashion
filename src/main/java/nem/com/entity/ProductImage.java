package nem.com.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    //n-1
}
