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


    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }
}
