package nem.com.constant.enums;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Objects;

public enum OrderStatusEnum {
    READY_TO_PICK(1,"ready_to_pick"),
    TRANSPORTING(2,"transporting"),
    DELIVERED(3,"delivered"),
    CANCEL(4,"cancel")
    ;

    private final int valueNumber;
    private final String valueString;

    OrderStatusEnum(int valueNumber, String valueString){
        this.valueNumber = valueNumber;
        this.valueString = valueString;
    }

    public static OrderStatusEnum valueOfStatus(String status){
        if (Objects.nonNull(status)){
            for (OrderStatusEnum e: values()) {
                if (e.valueString.equalsIgnoreCase(status)){
                    return e;
                }
            }
        }
        return null;
    }

    @JsonValue
    public String getValueString(){return valueString;}

    @JsonValue
    public int getValueNumber(){return valueNumber;}

}
