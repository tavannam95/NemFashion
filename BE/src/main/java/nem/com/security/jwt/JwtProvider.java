package nem.com.security.jwt;

import io.jsonwebtoken.*;
import nem.com.security.userprincipal.customer.CustomerPrinciple;
import nem.com.security.userprincipal.staff.EmployeePrinciple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtProvider.class);

    private final String JWT_SECRET = "phuongtd158";
    private final int JWT_EXPIRATION = 86400;

    public String createTokenCustomer(Authentication authentication) {
        CustomerPrinciple customerPrinciple = (CustomerPrinciple) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(customerPrinciple.getEmail())
                .claim("id", customerPrinciple.getId())
                .claim("fullname", customerPrinciple.getFullname())
                .claim("role", customerPrinciple.getRole().getName())
                .setExpiration(new Date(new Date().getTime() + JWT_EXPIRATION * 1000))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String createTokenEmployee(Authentication authentication) {
        EmployeePrinciple employeePrinciple = (EmployeePrinciple) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(employeePrinciple.getEmail())
                .claim("id", employeePrinciple.getId())
                .claim("fullname", employeePrinciple.getFullname())
                .claim("role", employeePrinciple.getRole().getName())
                .setExpiration(new Date(new Date().getTime() + JWT_EXPIRATION * 1000))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            LOGGER.error("Invalid jwt signature -> Message{}", e);
        } catch (MalformedJwtException e) {
            LOGGER.error("Invalid format Token -> Message{}", e);
        } catch (ExpiredJwtException e) {
            LOGGER.error("Expired JWT Token -> Message{}", e);
        } catch (UnsupportedJwtException e) {
            LOGGER.error("Unsupported JWT Token -> Message{}", e);
        } catch (IllegalArgumentException e) {
            LOGGER.error("JWT Token claims string is empty -> Message{}", e);
        }
        return false;
    }

    public String getEmailFromToken(String token) {
        String email = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        return email;
    }

    public String getRolesFromToken(String token) {
        String role = getAllClaimsFromToken(token).get("role").toString();
        return role;
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(JWT_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }


}
