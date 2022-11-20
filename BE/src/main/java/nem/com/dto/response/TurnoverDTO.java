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
        name = "TurnoverDTO" ,
        query = "" ,
        resultSetMapping = "turnover_dto"
)
@SqlResultSetMapping(
        name = "turnover_dto",
        classes = @ConstructorResult(
                targetClass = TurnoverDTO.class ,
                columns = {
                        @ColumnResult(name = "" , type = Double.class )
                }
        )
)
public class TurnoverDTO {
    @Id
    private Double total ;
    private String name ;
}
