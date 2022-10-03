package nem.com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_details", schema = "nem")
public class OrderDetails {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Basic
    @Column(name = "unitprice", nullable = true, precision = 0)
    private Double unitprice;

    @Basic
    @Column(name = "quantity", nullable = true)
    private Short quantity;

    @Basic
    @Column(name = "rating_status", nullable = true)
    private Short ratingStatus;

    @Basic
    @Column(name = "discount", nullable = true, precision = 0)
    private Double discount;

    @Basic
    @Column(name = "status", nullable = true)
    private Integer status;

    @JsonIgnore
    @OneToMany(mappedBy = "orderDetail")
    private List<Exchanges> listExchanges;

    @ManyToOne
    @JoinColumn(name = "product_detail_id", referencedColumnName = "id")
    private ProductsDetails productsDetail;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Orders order;
}