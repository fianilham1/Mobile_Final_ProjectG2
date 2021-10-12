package main.java.backend.model;

import java.util.List;

public class PaymentReq {
    private Double price;
    private List<String> vaList;

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<String> getVaList() {
        return vaList;
    }

    public void setVaList(List<String> vaList) {
        this.vaList = vaList;
    }

}
