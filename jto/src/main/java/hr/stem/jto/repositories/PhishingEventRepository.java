package hr.stem.jto.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import hr.stem.jto.entities.PhishingEvent;

@Repository
public interface PhishingEventRepository extends JpaRepository<PhishingEvent, Long> {

  @Query("SELECT e FROM PhishingEvent e WHERE e.name LIKE %?1% OR e.affectedBrand LIKE %?1% OR e.maliciousUrl LIKE %?1% OR e.description LIKE %?1%")
  List<PhishingEvent> searchByKeyword(String keyword);

  PhishingEvent findByMaliciousUrl(String url);

}
