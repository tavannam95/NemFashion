package nem.com.service;

import nem.com.domain.request.SellingDTO;
import nem.com.domain.request.ServiceResult;

public interface SellingService {
    ServiceResult<?> selling(SellingDTO sellingDTO);
}
