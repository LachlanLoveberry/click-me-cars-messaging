export async function sendMessage({
  message,
  mobile,
}: {
  message: string;
  mobile: string;
}) {
  const response = await fetch("https://api.justcall.io/v2/texts/new", {
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
      contact_number: `+${mobile}`,
      restrict_once: "Yes",
    }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.message);
  return json;
}
