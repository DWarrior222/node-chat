const isProp = process.env.NODE_ENV === 'production';
const wsUrl = !isProp ? 'ws://localhost:3334' : `ws://${location.host}/ws/`

export function createWs () {
  return new WebSocket(wsUrl);
}

export function listenBeforeUnload (callback?: () => void) {
  window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
    if (callback) callback();
  });
}

export function leaveWsPage () {
  const answer = window?.confirm(
    '确定离开当前页面吗'
  )
  if (!answer) return false
  else return true
}