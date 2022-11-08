package nem.com.exception;

import nem.com.dto.request.ServiceResult;
import nem.com.entity.ProductsDetails;

public class LitmitQuantitySellingException extends RuntimeException{
    public LitmitQuantitySellingException(String message){
        super(message);
    }
}
