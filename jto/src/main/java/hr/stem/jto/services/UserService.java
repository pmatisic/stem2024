package hr.stem.jto.services;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import hr.stem.jto.entities.User;
import hr.stem.jto.repositories.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public User registerUser(User user) {
    user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
    return userRepository.save(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public String generatePasswordResetToken(String email) {
    User user = userRepository.findByEmail(email);
    if (user == null) {
      throw new RuntimeException("User not found");
    }
    String token = UUID.randomUUID().toString();
    user.setPasswordResetToken(token);
    userRepository.save(user);
    return token;
  }

  public void resetPassword(String token, String newPassword) {
    User user = userRepository.findByPasswordResetToken(token);
    if (user == null) {
      throw new RuntimeException("Invalid token");
    }
    user.setPasswordHash(passwordEncoder.encode(newPassword));
    user.setPasswordResetToken(null);
    userRepository.save(user);
  }

}
