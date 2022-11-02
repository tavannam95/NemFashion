package nem.com.controller;

import nem.com.dto.request.ChangePasswordDTO;
import nem.com.dto.request.LoginFormUser;
import nem.com.dto.request.RegisterFormUser;
import nem.com.dto.response.JwtResponse;
import nem.com.entity.Customers;
import nem.com.exception.LoginInvalidException;
import nem.com.security.jwt.JwtProvider;
import nem.com.security.userprincipal.customer.CustomerUserDetailsService;
import nem.com.security.userprincipal.staff.EmployeeUserDetailsService;
import nem.com.service.CustomerService;
import nem.com.service.EmailService;
import nem.com.service.EmployeeService;
import net.bytebuddy.utility.RandomString;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmployeeService employeeService;

    @Qualifier("authenticationManagerUser")
    @Autowired
    private AuthenticationManager authenticationManagerUser;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    private EmployeeUserDetailsService employeeUserDetailsService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private EmailService emailService;

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginFormUser request) {
        try {
            Authentication authentication = authenticationManagerUser.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtProvider.createTokenCustomer(authentication);

            return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
        } catch (RuntimeException e) {
            throw new LoginInvalidException("Sai thông tin tài khoản hoặc mật khẩu !");
        }
    }

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterFormUser request) {
        Customers customer = this.mapper.map(request, Customers.class);
        return new ResponseEntity<>(this.customerService.save(customer), HttpStatus.OK);
    }

    @GetMapping("user/send-email")
    public boolean forgotPassword(@RequestParam("email") String email, @RequestParam("url") String url) throws MessagingException, UnsupportedEncodingException {
        System.out.println(email + " " + url);
        String token = RandomString.make(45);
        this.customerService.updateResetPassword(email, token);
        String resetPasswordLink = url + "/forgot-password?token=" + token;
        System.out.println(resetPasswordLink);
        return emailService.sendSimpleMail(email, resetPasswordLink);
    }

    @GetMapping("user/get-password-token")
    public Customers getCustomerByPasswordToken(@RequestParam("password-token") String passwordToken) {
        return this.customerService.findByResetPasswordToken(passwordToken);
    }

    @PostMapping("user/change-password")
    public boolean changePassword(@RequestBody ChangePasswordDTO request) {
        return this.customerService.updatePassword(request.getCustomerId(), this.passwordEncoder.encode(request.getNewPassword()));
    }
}
