package nem.com.service.impl;

import nem.com.entity.Customers;
import nem.com.entity.Roles;
import nem.com.exception.ResourceNotFoundException;
import nem.com.exception.UniqueFieldException;
import nem.com.repository.CustomersRepository;
import nem.com.repository.RolesRepository;
import nem.com.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

        Optional<Customers> customerByEmail = customersRepository.findCustomersByEmail(customers.getEmail());
        Optional<Customers> customerByPhone = customersRepository.findCustomersByPhone(customers.getPhone());

        if (customerByEmail.isPresent()) {
            throw new UniqueFieldException("Khách hàng có email " + customers.getEmail() + " đã tồn tại !");
        }
        if (customerByPhone.isPresent()) {
            throw new UniqueFieldException("Khách hàng có số điện thoại " + customers.getPhone() + " đã tồn tại !");
        }

        Roles role = rolesRepository.findRolesByName("ROLE_CUSTOMER");
        customers.setRole(role);
        return customersRepository.save(customers);
    }

    @Override
    public Customers update(Customers customers) {
        Roles role = rolesRepository.findRolesByName("ROLE_CUSTOMER");
//        Customers customerExists = get(customers.getId());
//
//        customers.setPassword(customerExists.getPassword());
        customers.setRole(role);
        return customersRepository.save(customers);
    }

    @Override
    public void delete(Integer id) {
        Customers customers = get(id);
        customers.setStatus((short) 0);
        customersRepository.save(customers);
    }
}
