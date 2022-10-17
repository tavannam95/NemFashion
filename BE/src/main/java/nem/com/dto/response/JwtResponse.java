package nem.com.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nem.com.entity.Roles;

@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {

    private Integer id;
    private String token;
    private String type = "Bearer";
    private String fullName;
    private Roles role;

    public JwtResponse(Integer id, String token, String fullName, Roles role) {
        this.id = id;
        this.token = token;
        this.fullName = fullName;
        this.role = role;
    }
}
