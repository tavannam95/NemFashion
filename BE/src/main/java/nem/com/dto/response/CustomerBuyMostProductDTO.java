package nem.com.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedNativeQuery(name = "CustomerBuyMostProductDTO" ,
query = " select sum(o.total) as total , c.fullname as name from orders o \n" +
        " join customers c on c.id = o.customer_id \n" +
        " where o.status = 3 \n" +
        " group by c.fullname\n" +
        " order by total desc " +
        "limit 0 , 7 ;\n" , resultSetMapping = "custome_product_dto")
@SqlResultSetMapping(
        name = "custome_product_dto" ,
        classes = @ConstructorResult(
                targetClass = CustomerBuyMostProductDTO.class ,
                columns = {
                        @ColumnResult(name = "total", type = Double.class),
                        @ColumnResult(name = "name", type = String.class),
                }
        )
)

public class CustomerBuyMostProductDTO {

    @Id
    private Double total ;

    private String name ;
}
