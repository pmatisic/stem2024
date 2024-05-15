package hr.stem.jto.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import hr.stem.jto.entities.PhishingEvent;
import hr.stem.jto.services.PhishingEventService;

@RestController
@RequestMapping("/api/events")
public class PhishingEventController {

  @Autowired
  private PhishingEventService phishingEventService;

  @GetMapping
  public ResponseEntity<List<PhishingEvent>> getAllEvents() {
    List<PhishingEvent> events = phishingEventService.getAllEvents();
    return ResponseEntity.ok(events);
  }

  @PostMapping
  public ResponseEntity<PhishingEvent> addEvent(@RequestBody PhishingEvent event) {
    PhishingEvent createdEvent = phishingEventService.addEvent(event);
    return ResponseEntity.ok(createdEvent);
  }

  @PutMapping("/{eventId}")
  public ResponseEntity<PhishingEvent> updateEvent(@PathVariable Long eventId,
      @RequestBody PhishingEvent event) {
    PhishingEvent updatedEvent = phishingEventService.updateEvent(eventId, event);
    return ResponseEntity.ok(updatedEvent);
  }

  @GetMapping("/search")
  public ResponseEntity<List<PhishingEvent>> searchEvents(@RequestParam String keyword) {
    List<PhishingEvent> events = phishingEventService.searchEvents(keyword);
    return ResponseEntity.ok(events);
  }

  @GetMapping("/search-url")
  public ResponseEntity<?> searchByUrl(@RequestParam String url) {
    PhishingEvent event = phishingEventService.findEventByUrl(url);
    List<PhishingEvent> similarEvents =
        phishingEventService.findSimilarUrls(event.getAffectedBrand());

    return ResponseEntity.ok(new SearchResponse(event != null, event, similarEvents));
  }

  private static class SearchResponse {

    public SearchResponse(boolean urlFound, PhishingEvent event,
        List<PhishingEvent> similarEvents) {}

  }

}
