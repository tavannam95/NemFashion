package nem.com.scheduled;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.cloudinary.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@EnableScheduling
@Slf4j
public class ScheduledUpdateOrderStatus {

    public static void main(String[] args) {
        SpringApplication.run(ScheduledUpdateOrderStatus.class, args);
    }

    @Scheduled(cron = "${scheduled.update.order.status.cron}")
    public void scheduledUpdateOrderStatus() throws ClientProtocolException, IOException {
        log.info("--ScheduledUpdateOrderStatus--");

        String uri = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail";

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(uri);

        String json = "{\"order_code\":\"LLGEA3\"}";
        StringEntity en = new StringEntity(json);

        httpPost.setEntity(en);
        httpPost.setHeader("ShopId", "120561");
        httpPost.setHeader("Token", "bd7afdaa-61da-11ed-889d-7acb4388671e");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);

        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            resultJsonStr.append(line);
        }
        JSONObject result = new JSONObject(resultJsonStr.toString());

        ObjectMapper mapper = new ObjectMapper();

        JsonNode jn = mapper.readTree(result.get("data").toString());

        log.info("--------------------------------: {}", jn.get("status"));

    }
}
