package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String email;
    String password;
    String fullname;
    @Temporal(TemporalType.DATE)
    Date birthDate;
    String address;
    String phone;
    @Temporal(TemporalType.DATE)
    Date siginDate;
    String photo;
    String notes;
    int status;
    //1-n,1-n
}
