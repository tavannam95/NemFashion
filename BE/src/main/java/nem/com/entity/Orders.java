package nem.com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Orders {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "create_date", nullable = true)
    private Timestamp createDate;

    @Basic
    @Column(name = "shipped_date", nullable = true)
    private Timestamp shippedDate;

    @Basic
    @Column(name = "freight", nullable = true, precision = 0)
    private Double freight;

    @Basic
    @Column(name = "ship_name", nullable = true, length = 255)
    private String shipName;

    @Basic
    @Column(name = "ship_address", nullable = true, length = 255)
    private String shipAddress;

    @Basic
    @Column(name = "ship_phone", nullable = true, length = 255)
    private String shipPhone;

    @Basic
    @Column(name = "note", nullable = true, length = 255)
    private String note;

    @Basic
    @Column(name = "total", nullable = true, precision = 0)
    private Double total;

    @Basic
    @Column(name = "status", nullable = true)
    private Short status;

    @JsonIgnore
    @OneToMany(mappedBy = "order")
    private List<OrderDetails> listOrderDetails;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employees employee;
}
