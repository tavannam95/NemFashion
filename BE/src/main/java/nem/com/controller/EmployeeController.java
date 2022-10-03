package nem.com.controller;

import nem.com.entity.Employees;
import nem.com.service.StaffService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/employee")
public class EmployeeController {

    private final StaffService staffService ;

    public EmployeeController( StaffService staffService ) {
        this.staffService = staffService ;
    }

    @RequestMapping("")
    public List<Employees> findAll() {
        return staffService.findAll() ;
    }


}
