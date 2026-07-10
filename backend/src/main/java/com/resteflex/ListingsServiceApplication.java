package com.resteflex;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ListingsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ListingsServiceApplication.class, args);
    }
}
