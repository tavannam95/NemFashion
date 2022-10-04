package nem.com.service.impl;

import nem.com.entity.Employees;
import nem.com.repository.EmployeesRepository;
import nem.com.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeesRepository employeesRepository ;

    public EmployeeServiceImpl(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    @Override
    public List<Employees> findAll() {
        return employeesRepository.findAll() ;
    }

    @Override
    public Employees create(Employees employees) {
        employees.setSiginDate( new Timestamp( System.currentTimeMillis() ) );
        return employeesRepository.save(employees) ;
    }

    @Override
    public Employees update(Employees employees) {
        return employeesRepository.save(employees) ;
    }

    @Override
    public boolean exitById(Integer id) {
        if( employeesRepository.existsById( id) ){
            return true ;
        }

        return false;
    }


}
