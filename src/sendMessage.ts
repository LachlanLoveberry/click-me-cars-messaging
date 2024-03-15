export function sendMessage({
  message,
  mobile,
}: {
  message: string;
  mobile: string;
}) {
  const contactNumber = "+61415127548";

  return fetch("https://api.justcall.io/v2/texts/new", {
    method: "POST",
    headers: {
      Authorization:
        "2c80692a9a705775e41c3367df5030a264f20c17:dd695ec26fdd1ff71e0e80b8f6c2e2b0a4f90552",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      justcall_number: "+61480029202",
      body: message,
      contact_number: contactNumber,
      restrict_once: "Yes",
    }),
  }).then((response) => response.json());
}
