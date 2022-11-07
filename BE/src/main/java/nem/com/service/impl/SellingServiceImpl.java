package nem.com.service.impl;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import nem.com.dto.request.ProductDetailsDTO;
import nem.com.dto.request.SellingDTO;
import nem.com.dto.request.ServiceResult;
import nem.com.entity.*;
import nem.com.exception.LitmitQuantitySellingException;
import nem.com.repository.OrderDetailsRepository;
import nem.com.repository.OrdersRepository;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.SellingService;
import org.hibernate.criterion.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;


@Service
public class SellingServiceImpl implements SellingService {

    private final OrdersRepository ordersRepository;

    private final OrderDetailsRepository orderDetailsRepository;

    private  final ProductsDetailsRepository productsDetailsRepository;

    public SellingServiceImpl(OrdersRepository ordersRepository,
                              OrderDetailsRepository orderDetailsRepository,
                              ProductsDetailsRepository productsDetailsRepository
                              ){
        this.orderDetailsRepository = orderDetailsRepository;
        this.ordersRepository = ordersRepository;
        this.productsDetailsRepository = productsDetailsRepository;
    }

    @Transactional(rollbackFor = RuntimeException.class)
    @Override
    public ServiceResult<?> selling(SellingDTO sellingDTO) {
        ServiceResult<SellingDTO> serviceResult = new ServiceResult<>();
        try {
        Timestamp date = new Timestamp(System.currentTimeMillis());
        Orders orders = new Orders();
        Customers customers = new Customers();
        Employees employees = new Employees();
        employees.setId(1); // Gán tạm dữ liệu employee;
        customers.setId(sellingDTO.getCustomer()!=null?sellingDTO.getCustomer():0);
        orders.setCustomer(customers);
        orders.setNote(sellingDTO.getNote());
        orders.setTotal(sellingDTO.getTotalPrice());
        orders.setCreateDate(date);
        orders.setStatus((short)6);
        orders.setEmployee(employees);
        orders.setDiscount(sellingDTO.getDiscount()*sellingDTO.getTotalPrice()/100);
        orders = ordersRepository.save(orders);
        for (ProductDetailsDTO productDetailsDTO: sellingDTO.getOrderDetail()){
            Optional<ProductsDetails> productsDetails = productsDetailsRepository.findById(productDetailsDTO.getId());
            if (productsDetails.isPresent()){
                if (productsDetails.get().getQuantity() < productDetailsDTO.getQuantity()){
                    ServiceResult<ProductsDetails> serviceResult1 = new ServiceResult<>();
                    serviceResult1.setStatus(HttpStatus.BAD_REQUEST);
                    serviceResult1.setMessage("Số lượng của sản phẩm đã được thay đổi vui lòng kiểm tra lại");
                    serviceResult1.setData(productsDetails.get());
                    return serviceResult1;
                };
            }
            OrderDetails orderDetails = new OrderDetails();
            ProductsDetails productsDetails1 = new ProductsDetails();
            productsDetails1.setId(productDetailsDTO.getId());
//            orderDetails.getOrder().setId(1L);
            orderDetails.setOrder(orders);
            orderDetails.setStatus(1);
            orderDetails.setQuantity(productDetailsDTO.getQuantity());
            orderDetails.setProductsDetail(productsDetails1);
            orderDetails.setRatingStatus((short)1);
            orderDetails.setStatus(1);
            orderDetailsRepository.save(orderDetails);
            productsDetails.get().setQuantity(productsDetails.get().getQuantity()-productDetailsDTO.getQuantity());
        }
        sellingDTO.setId(orders.getId());
        serviceResult.setData(sellingDTO);
        serviceResult.setStatus(HttpStatus.OK);
        }catch (RuntimeException e){
            serviceResult.setStatus(HttpStatus.BAD_REQUEST);
            e.printStackTrace();
            throw e;
        }
        return serviceResult;
    }
}
