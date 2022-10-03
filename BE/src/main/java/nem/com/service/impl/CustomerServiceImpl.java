package nem.com.service.impl;

import nem.com.entity.Customers;
import nem.com.entity.Roles;
import nem.com.exception.ResourceNotFoundException;
import nem.com.repository.CustomersRepository;
import nem.com.repository.RolesRepository;
import nem.com.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomersRepository customersRepository;
    private final RolesRepository rolesRepository;

    public CustomerServiceImpl(CustomersRepository customersRepository, RolesRepository rolesRepository) {
        this.customersRepository = customersRepository;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public Customers get(Integer id) {
        return customersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy khách hàng có mã: " + id));
    }

    @Override
    public List<Customers> getAll() {
        return this.customersRepository.findAll();
    }

    @Override
    public Customers save(Customers customers) {
        Roles role = rolesRepository.findRolesByName("ROLE_CUSTOMER");
        customers.setRole(role);
        return customersRepository.save(customers);
    }

    @Override
    public Customers update(Customers customers) {
        return customersRepository.save(customers);
    }

    @Override
    public void delete(Integer id) {
        Customers customers = get(id);
        customers.setStatus((short) 0);
        customersRepository.save(customers);
    }
}
