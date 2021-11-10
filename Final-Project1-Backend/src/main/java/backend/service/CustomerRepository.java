package main.java.backend.service;

import main.java.backend.model.User;

import java.io.IOException;
import java.util.List;

public interface CustomerRepository {
    public void insert(User user) throws IOException;
    public List<User> getAll() throws IOException;
    public User findUserLogin(User user) throws Exception;
    public void updateUser(User user) throws IOException;
    public void deleteUser(int id) throws IOException;
    public void updatePassByEmail(User user) throws IOException;
    public User findUsername(User user) throws Exception;

}