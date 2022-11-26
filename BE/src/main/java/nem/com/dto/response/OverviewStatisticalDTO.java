package nem.com.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedNativeQuery(
        name = "overview_statical" ,
        query = "select  (select count(orders.id) from orders ) as totalOrder ,\n" +
                " (select sum(orders.total) from orders where id = 3 ) as totalPrice , \n" +
                " (select count(orders.id) from orders where id = 4 ) as totalCancel from dual ;" ,
        resultSetMapping = "view_statical_dto"
)
@SqlResultSetMapping(
        name = "view_statical_dto" ,
        classes = @ConstructorResult(
                targetClass = OverviewStatisticalDTO.class ,
                columns = {
                        @ColumnResult( name = "totalOrder" , type = Long.class ) ,
                        @ColumnResult( name = "totalPrice" , type = Double.class ) ,
                        @ColumnResult( name = "totalCancel" , type = Long.class )
                }
        )
)
public class OverviewStatisticalDTO {
    @Id
    private Long totalOrder ;
    private Double totalPrice ;
    private Long totalCancel ;
}
