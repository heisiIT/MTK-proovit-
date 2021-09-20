package ee.tehik.service;

import ee.tehik.domain.Intoxication;
import ee.tehik.repository.IntoxicationRepository;
import jakarta.inject.Inject;

import java.util.UUID;

public class IntoxicationService {

    @Inject
    private IntoxicationRepository intoxicationRepository;

    public void save(Intoxication intoxication) {
        intoxicationRepository.save(intoxication);
    }

    public void update(Intoxication intoxication) {
        intoxicationRepository.update(intoxication);
    }

    public Intoxication find(UUID id) {
        return intoxicationRepository.findById(id).orElse(null);
    }

    public Iterable<Intoxication> getAll() {
        return intoxicationRepository.findAll();
    }

    public boolean existsById(UUID id) {
        return intoxicationRepository.existsById(id);
    }

    public void deleteById(UUID id) {
        intoxicationRepository.deleteById(id);
    }

}
