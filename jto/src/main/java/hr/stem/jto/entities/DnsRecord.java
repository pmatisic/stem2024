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
@Table(name = "dns_records")
public class DnsRecord {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long dnsId;

  @Column(nullable = false, length = 10)
  private String recordType;

  @Column(nullable = false, length = 255)
  private String recordValue;

  @ManyToOne
  @JoinColumn(name = "event_id", nullable = false)
  private PhishingEvent phishingEvent;

  // Getters and Setters

  public Long getDnsId() {
    return dnsId;
  }

  public void setDnsId(Long dnsId) {
    this.dnsId = dnsId;
  }

  public String getRecordType() {
    return recordType;
  }

  public void setRecordType(String recordType) {
    this.recordType = recordType;
  }

  public String getRecordValue() {
    return recordValue;
  }

  public void setRecordValue(String recordValue) {
    this.recordValue = recordValue;
  }

  public PhishingEvent getPhishingEvent() {
    return phishingEvent;
  }

  public void setPhishingEvent(PhishingEvent phishingEvent) {
    this.phishingEvent = phishingEvent;
  }
}
