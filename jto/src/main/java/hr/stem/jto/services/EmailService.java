package hr.stem.jto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender mailSender;

  public void sendPasswordResetEmail(String to, String token) {
    String resetUrl = "http://localhost:8080/api/users/reset-password?token=" + token;

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject("Password Reset Request");
    message.setText("To reset your password, click the link below:\n" + resetUrl);

    mailSender.send(message);
  }

}
