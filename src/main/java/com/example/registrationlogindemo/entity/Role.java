package com.example.registrationlogindemo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name="roles")
public class Role
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @ManyToMany(mappedBy="roles")
    private List<User> users;

    public Role(String name) {
        this.name = name;
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role(Long id) {
        this.id = id;
    }

    public Role(String name, List<User> users) {
        this.name = name;
        this.users = users;
    }

    public Role(Long id, String name, List<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Role(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.users.add(user);
    }

    public Role(String name, User user) {
        this.name = name;
        this.users.add(user);
    }

    public Role(Long id, User user) {
        this.id = id;
        this.users.add(user);
    }

    public Role(User user) {
        this.users.add(user);
    }

    public Role(Long id, String name, User user, List<User> users) {
        this.id = id;
        this.name = name;
        this.users.add(user);
        this.users = users;
    }

    public Role(String name, User user, List<User> users) {
        this.name = name;
        this.users.add(user);
        this.users = users;
    }

    public Role(Long id, User user, List<User> users) {
        this.id = id;
        this.users.add(user);
        this.users = users;
    }

    public Role(User user, List<User> users) {
        this.users.add(user);
        this.users = users;
    }
}
