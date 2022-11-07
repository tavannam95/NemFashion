package nem.com.repository.impl;

import nem.com.dto.request.ProductDetailsDTO;
import nem.com.repository.ProductDetailsCustomRepository;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.IntegerType;
import org.hibernate.type.ShortType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductDetailsCustomRepositoryImpl implements ProductDetailsCustomRepository {

    @Autowired
    EntityManager entityManager;

    @Override
    public List<ProductDetailsDTO> getProductDetailsByIdPro(Integer id) {
        List<ProductDetailsDTO> lst = new ArrayList<>();
        List<Object[]> listObj = new ArrayList<>();
        StringBuilder sql = new StringBuilder("" +
                "select pd.id, pd.quantity, c.id colorId, c.code nameColor, s.id sizeId, s.code nameSize\n" +
                "from products_details pd " +
                "join colors c on pd.color_id = c.id\n" +
                "join sizes s on pd.size_id = s.id \n" +
                "where product_id = :id");
        NativeQuery<ProductDetailsDTO> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        query
                .addScalar("id", new IntegerType())
                .addScalar("quantity", new IntegerType())
                .addScalar("colorId", new IntegerType())
                .addScalar("nameColor", new StringType())
                .addScalar("sizeId", new IntegerType())
                .addScalar("nameSize", new StringType())
                .setResultTransformer(Transformers.aliasToBean(ProductDetailsDTO.class));
        query.setParameter("id", id);

        return query.list();
    }
}
