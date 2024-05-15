package hr.stem.jto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import hr.stem.jto.entities.PhishingEvent;

public interface PhishingEventRepository extends JpaRepository<PhishingEvent, Long> {

}
