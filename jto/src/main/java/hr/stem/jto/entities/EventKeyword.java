package hr.stem.jto.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_keywords")
public class EventKeyword {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long keywordId;

  @Column(nullable = false, length = 255)
  private String keyword;

  @ManyToOne
  @JoinColumn(name = "event_id", nullable = false)
  private PhishingEvent phishingEvent;

  // Getters and Setters

  public Long getKeywordId() {
    return keywordId;
  }

  public void setKeywordId(Long keywordId) {
    this.keywordId = keywordId;
  }

  public String getKeyword() {
    return keyword;
  }

  public void setKeyword(String keyword) {
    this.keyword = keyword;
  }

  public PhishingEvent getPhishingEvent() {
    return phishingEvent;
  }

  public void setPhishingEvent(PhishingEvent phishingEvent) {
    this.phishingEvent = phishingEvent;
  }
}
