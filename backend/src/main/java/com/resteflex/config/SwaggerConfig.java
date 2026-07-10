package com.resteflex.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ResteFlex Listings API")
                        .version("1.0.0")
                        .description("API pour la gestion des logements Airbnb et réservations avec paiement Stripe")
                        .contact(new Contact()
                                .name("ResteFlex Team")
                                .email("contact@resteflex.fr")
                                .url("https://resteflex-conciergerie.fr")));
    }
}
