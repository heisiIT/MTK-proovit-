package ee.tehik.controller;

import ee.tehik.domain.Intoxication;
import ee.tehik.service.IntoxicationService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import jakarta.inject.Inject;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

@Controller()
public class IntoxicationController {

    @Inject
    private IntoxicationService intoxicationService;

    /**
     * Get all issues from DB
     *
     * @return
     */
    @Get("/issues")
    public List<Intoxication> getIssues() {
        Logger.getGlobal().info("get all items...");
        return (List<Intoxication>) intoxicationService.getAll();
    }

    @Post(value = "/issues", consumes = MediaType.APPLICATION_JSON)
    public void store(@Valid @Body Intoxication issue) {
        Logger.getGlobal().info("SAVE item...");
        intoxicationService.save(issue);
    }

    @Put(value = "/issues", consumes = MediaType.APPLICATION_JSON)
    public void update(@Body Intoxication issue) {
        issue.setCompleted(!issue.getCompleted());
        if (intoxicationService.existsById(issue.getId())) {

            intoxicationService.update(issue);
        } else {
            intoxicationService.save(issue);
        }
        Logger.getGlobal().info("update item... ");
    }

    /**
     * Delete issue by ID from DB
     *
     * @return
     */
    @Delete("/issues/{id}")
    public void deleteIssue(UUID id) {
        intoxicationService.deleteById(id);
        Logger.getGlobal().info("Delete item...");
    }

    /**
     * Get issue by ID from DB
     *
     * @return
     */
    @Get("/issues/{id}")
    public Intoxication getIssue(UUID id) {
        return intoxicationService.find(id);
    }

    /**
     * test request
     *
     * @param uuid
     * @return
     */
    @Get("/echo/{uuid}")
    public String issue(@PathVariable String uuid) {
        Logger.getGlobal().info("buzz...");
        return "echo # " + uuid + "!";
    }
}
