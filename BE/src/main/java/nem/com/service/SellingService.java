package nem.com.service;

import nem.com.dto.request.ProductDetailsDTO;
import nem.com.dto.request.SellingDTO;
import nem.com.dto.request.ServiceResult;

import java.util.List;

public interface SellingService {
    ServiceResult<?> selling(SellingDTO sellingDTO);

    List<ProductDetailsDTO> resetQuantityInventory(List<Long> lstId);

}
