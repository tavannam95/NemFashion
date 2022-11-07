package nem.com.service;

import nem.com.dto.request.SellingDTO;
import nem.com.dto.request.ServiceResult;

public interface SellingService {
    ServiceResult<?> selling(SellingDTO sellingDTO);
}
