package nem.com.scheduled;

import nem.com.entity.Discounts;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ProcessToPromotion extends Thread {
    private Discounts discounts ;

    public ProcessToPromotion( Discounts discounts ){
        this.discounts = discounts ;
    }

    @Override
    public void run() {
        Date date = new Date( );

    }

    private Long changeTime( Date now , Date startDate ){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY") ;
        if( sdf.format(now).equalsIgnoreCase( sdf.format(startDate) ) ){
            return 0L ;
        }

//        Long time = now.getDay() + now.getMonth() ;


        return 0L ;
    }
}
