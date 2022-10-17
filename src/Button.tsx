function updateCounter() {
  const pressUrl = "/.netlify/functions/press/";
  fetch(pressUrl).then(
    // This consistently logs nothing for the response.
    // Does FaunaDB return any response after a successful Update operation?
    (res) => console.log(`'Press' promise fulfilled: \n${JSON.stringify(res)}`),
    (err) => console.log(`'Press' promise rejected: \n${JSON.stringify(err)}`)
  );
}

export default function Button() {
  return (
    <button onClick={updateCounter}>beep</button>
  )
}