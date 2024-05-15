package hr.stem.jto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import hr.stem.jto.entities.EventComment;

public interface EventCommentRepository extends JpaRepository<EventComment, Long> {

}
