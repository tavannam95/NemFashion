package nem.com.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@NamedNativeQuery(
        name = "TurnoverDTO" ,
        query = "select sum( o.total) as TT , date_format( o.create_date,:type) as dd \n" +
                "from orders o \n" +
                "where (o.status = 3 or o.status = 6) and date_format( o.create_date , '%d %m %Y') between date_format(:startDate, '%d %m %Y')" +
                " and  date_format(:endDate , '%d %m %Y') \n" +
                "group by dd " +
                "order by o.create_date;\n" ,
        resultSetMapping = "turnover_dto"
)
@SqlResultSetMapping(
        name = "turnover_dto",
        classes = @ConstructorResult(
                targetClass = TurnoverDTO.class ,
                columns = {
                        @ColumnResult(name = "TT" , type = Double.class ) ,
                        @ColumnResult(name = "dd" , type = String.class ) ,
                }
        )
)
public class TurnoverDTO {
    @Id
    private Double total ;
    private String name ;
}
