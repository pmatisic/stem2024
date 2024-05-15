package hr.stem.jto.entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "phishing_events")
public class PhishingEvent {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long eventId;

  @Column(nullable = false, length = 255)
  private String name;

  @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime creationDatetime;

  @Column(nullable = false, length = 255)
  private String affectedBrand;

  @Column(length = 1500)
  private String description;

  @Column(nullable = false, length = 255)
  private String maliciousUrl;

  @Column
  private Date domainRegistrationDate;

  @Column(nullable = false, length = 20)
  private String status;

  @ManyToOne
  @JoinColumn(name = "created_by", nullable = false)
  private User createdBy;

  @OneToMany(mappedBy = "phishingEvent", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DnsRecord> dnsRecords;

  @OneToMany(mappedBy = "phishingEvent", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<EventKeyword> eventKeywords;

  @OneToMany(mappedBy = "phishingEvent", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<EventComment> eventComments;

  public Long getEventId() {
    return eventId;
  }

  public void setEventId(Long eventId) {
    this.eventId = eventId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getCreationDatetime() {
    return creationDatetime;
  }

  public void setCreationDatetime(LocalDateTime creationDatetime) {
    this.creationDatetime = creationDatetime;
  }

  public String getAffectedBrand() {
    return affectedBrand;
  }

  public void setAffectedBrand(String affectedBrand) {
    this.affectedBrand = affectedBrand;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getMaliciousUrl() {
    return maliciousUrl;
  }

  public void setMaliciousUrl(String maliciousUrl) {
    this.maliciousUrl = maliciousUrl;
  }

  public Date getDomainRegistrationDate() {
    return domainRegistrationDate;
  }

  public void setDomainRegistrationDate(Date domainRegistrationDate) {
    this.domainRegistrationDate = domainRegistrationDate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public User getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(User createdBy) {
    this.createdBy = createdBy;
  }

  public List<DnsRecord> getDnsRecords() {
    return dnsRecords;
  }

  public void setDnsRecords(List<DnsRecord> dnsRecords) {
    this.dnsRecords = dnsRecords;
  }

  public List<EventKeyword> getEventKeywords() {
    return eventKeywords;
  }

  public void setEventKeywords(List<EventKeyword> eventKeywords) {
    this.eventKeywords = eventKeywords;
  }

  public List<EventComment> getEventComments() {
    return eventComments;
  }

  public void setEventComments(List<EventComment> eventComments) {
    this.eventComments = eventComments;
  }
}
