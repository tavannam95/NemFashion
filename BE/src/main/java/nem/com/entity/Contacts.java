package nem.com.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Contacts {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private int id;

    @Basic
    @Column(name = "name", nullable = true, length = 255)
    private String name;

    @Basic
    @Column(name = "phone", nullable = true, length = 255)
    private String phone;

    @Basic
    @Column(name = "address_name", nullable = true, length = 255)
    private String addressName;

    @Basic
    @Column(name = "ward", nullable = true, length = 50)
    private String ward;

    @Basic
    @Column(name = "district", nullable = true, length = 50)
    private String district;

    @Basic
    @Column(name = "province", nullable = true, length = 50)
    private String province;

    @Basic
    @Column(name = "status", nullable = true)
    private Short status;
}
