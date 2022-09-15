package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    double unitprice;
    String description;
    @Temporal(TemporalType.DATE)
    Date createDate;
    @Temporal(TemporalType.DATE)
    Date updateDate;
    int status;
    //n-1
    int category_id;
}

