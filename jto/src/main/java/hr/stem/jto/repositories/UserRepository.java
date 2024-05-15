package hr.stem.jto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import hr.stem.jto.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
