package main.java.backend.service;

import main.java.backend.model.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class CustomerRepositoryImpl implements CustomerRepository{

//    /**
//    Register New User and Insert it to Database user
//     */

    @Override
    public List<User> getAll() throws IOException{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        List<User> userList= session.selectList("User.getAll");
        System.out.println("record get all successfully");
        session.commit();
        session.close();

        return userList;
    }

    @Override
    public void insert(User user) throws IOException{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        session.insert("User.insert", user);
        System.out.println("record inserted successfully");
        session.commit();
        session.close();
    }

    @Override
    public User findUserLogin(User user) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map params = new HashMap<>();
        params.put("usernameIn",user.getUsername());
        params.put("passwordIn",user.getPassword());

        User userDB = (User) session.selectOne("User.login", params);
        if(userDB==null){
            session.commit();
            session.close();
            return null;
        }
        session.commit();
        session.close();
        return userDB;
    }

    @Override
    public User findUsername(User user) throws Exception{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map params = new HashMap<>();
        params.put("username",user.getUsername());

        User userDB = (User) session.selectOne("User.username", params);
        if(userDB==null){
            session.commit();
            session.close();
            return null;
        }
        session.commit();
        session.close();
        return userDB;
    }

    @Override
    public void updateUser(User user) throws IOException{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        //Update the student record
        session.update("User.update",user);
        System.out.println("Record updated successfully");

        session.commit();
        session.close();
    }
    @Override
    public void deleteUser(int id) throws IOException{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        //Delete the user record
        System.out.println("Delete id in backend: "+id);
        session.delete("User.deleteById",id);
        System.out.println("Record delete successfully");

        session.commit();
        session.close();
    }

    @Override
    public void updatePassByEmail(User user) throws IOException{
        Reader reader = Resources.getResourceAsReader("SqlMapConfigUser.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        SqlSession session = sqlSessionFactory.openSession();

        Map params = new HashMap<>();
        params.put("password",user.getPassword());
        params.put("username",user.getUsername());

        session.insert("User.updatePass", params);
        System.out.println("Set New Password successfully");
        session.commit();
        session.close();
    }

}
