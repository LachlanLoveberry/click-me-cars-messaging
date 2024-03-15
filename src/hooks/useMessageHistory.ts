import { useQuery } from "@tanstack/react-query";

export function useMessageHistory(mobile: string) {
  return useQuery<{ data: {}[] }>({
    queryFn: () => {
      const contactNumber = JSON.stringify("+61415127548");
      return { data: [] };
      // return fetch(
      //   `https://api.justcall.io/v2/texts?sort=id&order=desc&contact_number=${contactNumber}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization:
      //         "2c80692a9a705775e41c3367df5030a264f20c17:dd695ec26fdd1ff71e0e80b8f6c2e2b0a4f90552",
      //       accept: "application/json",
      //     },
      //   },
      // ).then((response) => response.json());
    },
    queryKey: ["getMessageHistory", mobile],
  });
}
