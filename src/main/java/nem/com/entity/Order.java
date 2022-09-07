package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @Temporal(TemporalType.DATE)
    Date createDate;
    @Temporal(TemporalType.DATE)
    Date shippedDate;
    double freight;
    String shipName;
    String shipAddress;
    String shipPhone;
    int status;
    //n-1,n-1,1-n
}
