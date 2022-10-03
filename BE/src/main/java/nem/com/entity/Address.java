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
public class Address {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Basic
    @Column(name = "city", nullable = true, length = 255)
    private String city;

    @Basic
    @Column(name = "district", nullable = true, length = 255)
    private String district;

    @Basic
    @Column(name = "ward", nullable = true, length = 255)
    private String ward;

    @Basic
    @Column(name = "other", nullable = true, length = 255)
    private String other;

    @Basic
    @Column(name = "status", nullable = true)
    private Byte status;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Customers customer;

}
