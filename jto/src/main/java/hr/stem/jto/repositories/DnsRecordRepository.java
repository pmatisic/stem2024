package hr.stem.jto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import hr.stem.jto.entities.DnsRecord;

public interface DnsRecordRepository extends JpaRepository<DnsRecord, Long> {

}
