package com.example.registrationlogindemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Autowired
    private UserDetailsService userDetailsService;

    // Codificador de contraseñas BCrypt para encriptar las contraseñas de los usuarios
    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    // Configuración de Spring Security para el login y el registro de usuarios
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().and() // Habilita la protección CSRF (Cross-Site Request Forgery) para evitar ataques CSRF
                .requiresChannel()// Requiere un canal seguro (HTTPS)
                .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)// Requiere un encabezado X-Forwarded-Proto para detectar el protocolo HTTPS cuando se ejecuta detrás de un proxy
                .requiresSecure() // Forza a HTTPS
                .and()
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/register/**").permitAll()
                                .requestMatchers("/index").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/principal").hasRole("USER")
                                .requestMatchers("/guardados").hasRole("USER")
                                .requestMatchers("/preguntas").hasRole("USER")
                                .requestMatchers("/error").permitAll()
                                .requestMatchers("/css/**", "/static/**", "/js/**", "**/favicon.ico").permitAll()
                                .requestMatchers("/users").hasRole("USER")
                                .anyRequest().authenticated()
                )
                .formLogin(
                        form -> form
                                .loginPage("/login")
                                .loginProcessingUrl("/login")
                                .defaultSuccessUrl("/principal")
                                .failureUrl("/login?error=true")
                                .permitAll()
                )
                .logout(
                        logout -> logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                                .permitAll()
                );
        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }
}