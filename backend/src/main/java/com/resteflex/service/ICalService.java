package com.resteflex.service;

import com.resteflex.entity.Booking;
import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.*;
import net.fortuna.ical4j.util.RandomUidGenerator;
import org.springframework.stereotype.Service;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class ICalService {
    private static final String ICAL_FILE_PATH = "calendars/bookings.ics";

    public void addBookingToCalendar(Booking booking) {
        try {
            Calendar calendar = getOrCreateCalendar();

            // Créer l'événement
            VEvent event = new VEvent();
            event.add(new Uid(new RandomUidGenerator().generateUid().getValue()));
            event.add(new DtStart(convertToDate(booking.getCheckIn())));
            event.add(new DtEnd(convertToDate(booking.getCheckOut())));
            event.add(new Summary("Réservation: " + booking.getListing().getTitle()));
            event.add(new Description("Email: " + booking.getEmail() + "\nHôtes: " + booking.getGuests()));
            event.add(new Location(booking.getListing().getLocation()));
            event.add(new Created(new DateTime(LocalDateTime.now())));
            event.add(new LastModified(new DateTime(LocalDateTime.now())));

            calendar.getComponents().add(event);

            // Sauvegarder
            saveCalendar(calendar);
        } catch (Exception e) {
            throw new RuntimeException("Erreur ajout calendrier iCal", e);
        }
    }

    public void removeBookingFromCalendar(Booking booking) {
        try {
            Calendar calendar = getOrCreateCalendar();
            calendar.getComponents().removeIf(c ->
                    c instanceof VEvent && ((VEvent) c).getProperty("DESCRIPTION")
                            .map(p -> p.getValue().contains(booking.getEmail()))
                            .orElse(false)
            );
            saveCalendar(calendar);
        } catch (Exception e) {
            throw new RuntimeException("Erreur suppression calendrier iCal", e);
        }
    }

    private Calendar getOrCreateCalendar() {
        Calendar calendar = new Calendar();
        calendar.add(new ProdId("-//ResteFlex//Bookings Calendar//FR"));
        calendar.add(Version.VERSION_2_0);
        calendar.add(CalScale.GREGORIAN);
        return calendar;
    }

    private void saveCalendar(Calendar calendar) throws IOException {
        try (FileWriter fw = new FileWriter(ICAL_FILE_PATH)) {
            fw.write(calendar.toString());
        }
    }

    private Date convertToDate(LocalDate localDate) {
        return new Date(java.sql.Date.valueOf(localDate));
    }
}
