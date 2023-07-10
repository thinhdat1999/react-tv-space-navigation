import {
  Directions,
  SpatialNavigation,
} from 'react-native-tv-spatial-navigation/src';

SpatialNavigation.configureKeyboard({
  keyboardSubscriber: callback => {
    const mapping = {
      ArrowRight: Directions.RIGHT,
      ArrowLeft: Directions.LEFT,
      ArrowUp: Directions.UP,
      ArrowDown: Directions.DOWN,
    };

    const eventId = window.addEventListener('keydown', keyEvent => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TODO fix me, but this is just a demo anyway
      callback(mapping[keyEvent.code]);
    });

    return eventId;
  },

  keyboardUnsubscriber: eventId => {
    window.removeEventListener('keydown', eventId);
  },
});