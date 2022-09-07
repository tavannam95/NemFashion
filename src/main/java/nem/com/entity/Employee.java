package nem.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String username;
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
    //n-1
}
