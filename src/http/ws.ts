const isProp = process.env.NODE_ENV === 'production';
const wsUrl = !isProp ? 'ws://localhost:3334' : `ws://${location.host}/ws/`

export function createWs () {
  try {
    return new WebSocket(wsUrl);
  } catch (error) {
    console.log(error);
  }
}

export function listenBeforeUnload (callback?: () => void) {
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
    if (callback) callback();
  });
}