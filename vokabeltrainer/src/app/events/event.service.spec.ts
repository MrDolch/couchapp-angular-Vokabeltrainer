import { EventService, Event, Operation } from './event.service';

describe('EventService', function () {

  it('should create an Event on addLanguage', () => {
    // arrange
    let testee = new EventService(null);
    testee.create = (event: Event) => { createdEvent = event; return null };
    let createdEvent: Event;
    // act
    testee.addLanguage('fr')
    // assert
    expect(createdEvent.getOperation()).toBe(Operation.addLanguage);
  });
  it('should mark as deleted an Event on deleteLanguage', () => {
    // arrange
    let testee = new EventService(null);
    testee.create = (event: Event) => { createdEvent = event; return null };
    let createdEvent: Event;
    // act
    testee.deleteLanguage('fr')
    // assert
    expect(createdEvent.getOperation()).toBe(Operation.deleteLanguage);
  });
});
