function updateCounter() {
  const pressUrl = window.location.hostname + "/.netlify/functions/press/";
  fetch(pressUrl).then(
    (res) => console.log(`'Press' promise fulfilled: \n${JSON.stringify(res)}`),
    (err) => console.log(`'Press' promise rejected: \n${JSON.stringify(err)}`)
  );
}

export default function Button() {
  return (
    <button onClick={updateCounter}>beep</button>
  )
}