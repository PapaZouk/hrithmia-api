import {createEventNotification} from "../_mocks/createEventNotification.ts";
import {validateEventNotification} from "../../../src/validators/eventNotificationValidator.ts";
import {assertEquals} from "jsr:@std/assert";

Deno.test("given a data object should parse it with the eventNotificationSchema, should validate and return true ", () => {
   const eventNotificationData = createEventNotification();

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, true);
});

Deno.test("given a data object is missing eventId, should validate and return false", () => {
   const eventNotificationData = createEventNotification({eventId: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing userId, should validate and return false", () => {
   const eventNotificationData = createEventNotification({userId: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing title, should validate and return false", () => {
   const eventNotificationData = createEventNotification({title: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing description, should validate and return false", () => {
   const eventNotificationData = createEventNotification({description: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing date, should validate and return false", () => {
   const eventNotificationData = createEventNotification({date: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing time, should validate and return false", () => {
   const eventNotificationData = createEventNotification({time: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing location, should validate and return false", () => {
   const eventNotificationData = createEventNotification({location: ""});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing tags, should validate and return false", () => {
   const eventNotificationData = createEventNotification({tags: []});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, false);
});

Deno.test("given a data object is missing isRead, should validate and return true", () => {
   const eventNotificationData = createEventNotification({isRead: undefined});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, true);
});

Deno.test("given a data object is missing createdBy, should validate and return true", () => {
   const eventNotificationData = createEventNotification({createdBy: undefined});

    const result = validateEventNotification(eventNotificationData);

    assertEquals(result, true);
});