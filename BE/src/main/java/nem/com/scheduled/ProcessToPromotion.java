package nem.com.scheduled;

import nem.com.entity.Discounts;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class ProcessToPromotion extends Thread {
    private Discounts discounts ;

    public ProcessToPromotion( Discounts discounts ){
        this.discounts = discounts ;
    }

    @Override
    public void run() {

    }

    private Long changeTime( Date startDate , Date endDate ){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY") ;
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        if( sdf.format(startDate).equalsIgnoreCase( sdf.format(startDate) ) ){
            return 0L ;
        }else {
            c1.setTime(startDate);
            c2.setTime(endDate);
            return c2.getTime().getTime() - c1.getTime().getTime() ;
        }
    }
}
