import mapResponseToEventNotification from "../../../src/mapper/mapResponseToEventNotiication.ts";
import EventNotification, {IEventNotification} from "../../../src/model/IEventNotification.ts";
import { assertEquals } from "jsr:@std/assert";
import { assertInstanceOf } from "https://deno.land/std/assert/assert_instance_of.ts";

Deno.test("given data should map to EventNotification instance", () => {
  // Arrange
  const data = {
    eventId: "60d5ec49b3c0a12d74c3f543",
    userId: "60d5ec49b3c0a12d74c3f543",
    title: "title",
    description: "description",
    date: new Date(),
    time: new Date(),
    location: "location",
    createdBy: "createdBy",
    tags: ["tag1", "tag2"],
    isRead: true,
  };

    // Act
    const eventNotification = mapResponseToEventNotification(data as unknown as IEventNotification);

    // Assert
    assertInstanceOf(eventNotification, EventNotification);
    assertEquals(eventNotification.eventId.toString(), "60d5ec49b3c0a12d74c3f543");
    assertEquals(eventNotification.userId.toString(), "60d5ec49b3c0a12d74c3f543");
    assertEquals(eventNotification.title, "title");
    assertEquals(eventNotification.description, "description");
    assertEquals(eventNotification.location, "location");
    assertEquals(eventNotification.createdBy, "createdBy");
    assertEquals(eventNotification.tags.length, 2);
    assertEquals(eventNotification.tags[0], "tag1");
    assertEquals(eventNotification.tags[1], "tag2");
    assertEquals(eventNotification.isRead, true);
});
