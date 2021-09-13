package main.java.backend.model;

import java.util.List;

public class PurchasePayment {
    private int purchaseId;
    private List<ThirdPartyPayment> thirdPartyPaymentList;

    public int getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(int purchaseId) {
        this.purchaseId = purchaseId;
    }

    public List<ThirdPartyPayment> getThirdPartyPaymentList() {
        return thirdPartyPaymentList;
    }

    public void setThirdPartyPaymentList(List<ThirdPartyPayment> thirdPartyPaymentList) {
        this.thirdPartyPaymentList = thirdPartyPaymentList;
    }

}
