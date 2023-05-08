import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EventDto from "../models/IEventDto";
import { useAuth0 } from "@auth0/auth0-react";
import EventService from "../services/EventService";
import { Container, Loading } from "@nextui-org/react";

export default function EventPage() {
  const [event, setEvent] = useState<EventDto>();
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const service = new EventService();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();

      if (eventId) {
        const returned = await service.getEvent(token, eventId);
        setEvent(returned);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container gap={15}>
      {event ? (
        <h3>
          {event.name} {event.subtitle && <>({event.subtitle})</>}
        </h3>
      ) : (
        <h3>Error</h3>
      )}
    </Container>
  );
}