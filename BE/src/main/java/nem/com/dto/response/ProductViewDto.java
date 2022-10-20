package nem.com.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nem.com.entity.Colors;
import nem.com.entity.Products;
import nem.com.entity.ProductsDetails;
import nem.com.entity.Sizes;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductViewDto {
    Products product;
    Colors color;
    int quantity;
    Sizes size;
}
