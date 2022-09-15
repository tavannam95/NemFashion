package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String image;
    @Temporal(TemporalType.DATE)
    Date createDate;
    @Temporal(TemporalType.DATE)
    Date updateDate;
    int status;
    //1-n
}
