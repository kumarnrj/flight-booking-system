package com.skyindia.flightpaymentservice.Controller;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.skyindia.flightpaymentservice.Model.Payment;
import com.skyindia.flightpaymentservice.Repository.PaymentRepo;
import com.skyindia.flightpaymentservice.Service.PaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class paymentController {

    @Autowired
    private PaymentRepo paymentRepo;

    @Autowired
    private PaymentService paymentService;







    @PostMapping("/create_order")
    public String createOrder(@RequestBody Map<String,Object> amount) throws RazorpayException {

        int amt = Integer.parseInt(amount.get("amount").toString());
        String custOrderId= amount.get("custOId").toString();
       RazorpayClient client= new RazorpayClient("rzp_test_LlIH2IiYZuqvQS","y41zacfr20MtTbHNBqq9Ot7X");

        JSONObject ob = new JSONObject();
        ob.put("amount",amt*100);
        ob.put("currency","INR");
        ob.put("receipt","TXN_123");

        // creating order
        Order order = client.Orders.create(ob);

       // creating payment instance to save the data

        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(order.get("amount").toString());
        payment.setCustOrderId(custOrderId);
        payment.setPaymentId("");
        payment.setStatus(order.get("status"));

        // saving to the database
        paymentService.addPayment(payment);

        System.out.println(order);
        return  order.toString();
    }

    @PostMapping("/update_order")
    public ResponseEntity<?> updateOrder(@RequestBody Map<String,Object> data){

        Payment payment= paymentRepo.findById(data.get("order_id").toString()).get();


        System.out.println(payment);
        payment.setPaymentId(data.get("payment_id").toString());
        payment.setStatus(data.get("status").toString());
        paymentRepo.save(payment);
        return ResponseEntity.ok("");

    }
}
