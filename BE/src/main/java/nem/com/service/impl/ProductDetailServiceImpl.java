package nem.com.service.impl;

import nem.com.domain.request.ProductDetailsDTO;
import nem.com.domain.request.ServiceResult;
import nem.com.domain.response.ProductDetailResponseDTO;
import nem.com.entity.ProductsDetails;
import nem.com.exception.ResourceNotFoundException;
import nem.com.exception.UniqueFieldException;
import nem.com.repository.ProductsDetailsRepository;
import nem.com.service.ProductDetailService;
import nem.com.utils.BarcodeUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private final ProductsDetailsRepository productsDetailsRepository;

    public ProductDetailServiceImpl(ProductsDetailsRepository productsDetailsRepository) {
        this.productsDetailsRepository = productsDetailsRepository;
    }

    @Override
    public List<ProductsDetails> getAll() {
        return this.productsDetailsRepository.findAll();
    }

    @Override
    public ProductsDetails getOne(Integer id) {
        return this.productsDetailsRepository.findById(id).get();
    }

    @Override
    public ProductsDetails update(ProductsDetails productsDetails) {
        return this.productsDetailsRepository.save(productsDetails);
    }

    @Override
    public void delete(Integer id) {
        ProductsDetails productsDetails = getOne(id);
        this.productsDetailsRepository.delete(productsDetails);
    }

    @Override
    public ProductsDetails save(ProductsDetails productsDetails) {
        return this.productsDetailsRepository.save(productsDetails);
    }

    @Override
    public List<ProductDetailsDTO> getByIdProduct(Integer id) {
        return this.productsDetailsRepository.getProductDetailsByIdPro(id);
    }
    public List<ProductsDetails> findProductsDetailsByProductId(Integer productId) {
        return this.productsDetailsRepository.findProductsDetailsByProductId(productId);
    }

    @Override
    public ProductsDetails findProductDetailBySizeAndColor(Integer productId, Integer sizeId, Integer colorId) {
        return this.productsDetailsRepository.findProductDetailBySizeAndColor(productId, sizeId, colorId);
    }
    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<ProductDetailResponseDTO> createProductDetails(List<ProductDetailResponseDTO> list) {
        for (ProductDetailResponseDTO p: list
        ) {
            try {
                ProductsDetails productsDetails = new ProductsDetails();

            int productId = p.getProduct().getId();
            int colorId = p.getColor().getId();
            int sizeId = p.getSize().getId();
            List<ProductsDetails> productsDetailsList = this.productsDetailsRepository.findProductDetailByProductSizeColor(productId,colorId,sizeId);
            if (!productsDetailsList.isEmpty()){
                productsDetails = this.productsDetailsRepository.findProductDetailByProductSizeColor(productId,colorId,sizeId).get(0);
                productsDetails.setQuantity(productsDetails.getQuantity()+p.getQuantity());
            }else{
                productsDetails.setProduct(p.getProduct());
                productsDetails.setColor(p.getColor());
                productsDetails.setSize(p.getSize());
                productsDetails.setQuantity(p.getQuantity());
                while(true){
                    Random generator = new Random();
                    int barCode = generator.nextInt((9999999 - 1000000) + 1) + 1000000;
                    ProductsDetails productsDetails1 = this.productsDetailsRepository.getByBarCode(barCode+"");
                    System.out.println(productsDetails1);
                    if (productsDetails1 == null){
                        productsDetails.setBarCode(barCode+"");
                        break;
                    }
                }
            }
                this.productsDetailsRepository.save(productsDetails);
            }catch (Exception e){
                throw new UniqueFieldException("ABC");
            }
        }

        return list;
    }

    @Override
    public List<ProductsDetails> findProductDetailByProductSizeColor(ProductDetailResponseDTO productViewDto) {
        int productId = productViewDto.getProduct().getId();
        int colorId = productViewDto.getColor().getId();
        int sizeId = productViewDto.getSize().getId();
        return this.productsDetailsRepository.findProductDetailByProductSizeColor(productId,colorId,sizeId);
    }

    @Override
    public ProductsDetails getByBarcode(String barcode){
        return this.productsDetailsRepository.getByBarCode(barcode);
    }

    @Override
    public ServiceResult<?> generateBarcode(Integer id){
        ProductsDetails productsDetails = productsDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Id not found " + id));
        String barCode = productsDetails.getBarCode();
        ServiceResult<?> result = new ServiceResult<>();
       result.setMessage(BarcodeUtils.generateBarcode(barCode,productsDetails.getProduct().getPrice(),300,100));
        return result;
    }
}
