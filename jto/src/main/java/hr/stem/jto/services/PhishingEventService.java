package hr.stem.jto.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hr.stem.jto.entities.PhishingEvent;
import hr.stem.jto.repositories.PhishingEventRepository;

@Service
public class PhishingEventService {

  @Autowired
  private PhishingEventRepository phishingEventRepository;

  public List<PhishingEvent> getAllEvents() {
    return phishingEventRepository.findAll();
  }

  public PhishingEvent addEvent(PhishingEvent event) {
    return phishingEventRepository.save(event);
  }

  public List<PhishingEvent> searchEvents(String keyword) {
    return phishingEventRepository.searchByKeyword(keyword);
  }

  public PhishingEvent findEventByUrl(String url) {
    return phishingEventRepository.findByMaliciousUrl(url);
  }

  public List<PhishingEvent> findSimilarUrls(String keyword) {
    return phishingEventRepository.searchByKeyword(keyword);
  }

  public PhishingEvent updateEvent(Long eventId, PhishingEvent updatedEvent) {
    return phishingEventRepository.findById(eventId).map(event -> {
      event.setName(updatedEvent.getName());
      event.setAffectedBrand(updatedEvent.getAffectedBrand());
      event.setDescription(updatedEvent.getDescription());
      event.setMaliciousUrl(updatedEvent.getMaliciousUrl());
      event.setDomainRegistrationDate(updatedEvent.getDomainRegistrationDate());
      event.setStatus(updatedEvent.getStatus());
      return phishingEventRepository.save(event);
    }).orElseThrow(() -> new RuntimeException("Event not found"));
  }

}
