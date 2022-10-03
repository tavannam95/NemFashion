package nem.com.service.impl;

import nem.com.entity.Employees;
import nem.com.repository.EmployeesRepository;
import nem.com.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {

    private final EmployeesRepository employeesRepository ;

    public StaffServiceImpl(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }


    @Override
    public List<Employees> findAll() {
        return employeesRepository.findAll() ;
    }
}
