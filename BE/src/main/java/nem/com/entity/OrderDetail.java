package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    double unitprice;
    int quantity;
    @Temporal(TemporalType.DATE)
    Date createDate;
    int ratingStatus;
    double discount;
    //n-1,n-1
}
