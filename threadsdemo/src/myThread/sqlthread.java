package myThread;


import ehr.bplist;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.lang.String;

public class sqlthread implements Callable<List> {
    private String address;
    private int amount;
    public sqlthread(String addr, int am){
        this.address=addr;
        this.amount=am;
    }
    @Override
    public List<bplist> call(){

    return new ArrayList<bplist>();
    }
}
