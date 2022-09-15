package nem.com.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "product_details")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    int quantity;
    //1-n,n-1,n-1
}
