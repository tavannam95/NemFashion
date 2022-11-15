package nem.com.schedule;

import lombok.extern.slf4j.Slf4j;
import nem.com.domain.dto.OrderCode;
import nem.com.domain.request.OrderGhnResponse;
import nem.com.entity.Products;
import org.apache.http.Header;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.tomcat.util.json.JSONParser;
import org.cloudinary.json.JSONObject;
import org.modelmapper.internal.util.Lists;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@EnableScheduling
@Slf4j
public class UpdateOrderGhn {

    public static void main(String[] args) {
        SpringApplication.run(UpdateOrderGhn.class,args);
    }

    @Scheduled(cron = "*/10 * * * * *")
    public void updateOrderGhn(){
        log.info("Update Order GHN");

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail";

        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("OrderCode", "LLGRQ3");

//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("OrderCode","LLGRQ3");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type","application/json");
        headers.set("Token","bd7afdaa-61da-11ed-889d-7acb4388671e");
        headers.set("ShopId","120561");

        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map,headers);

        ResponseEntity<OrderGhnResponse> result =
                restTemplate.postForEntity(url, httpEntity, OrderGhnResponse.class);

        log.info("Response Order GHN info: ");
    }
}
