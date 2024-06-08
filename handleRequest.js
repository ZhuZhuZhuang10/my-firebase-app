exports.handleRequest = async (req, res) => {
  // Replace HOST with your V2Ray server domain or IP address
  let url = new URL(req.url);
  url.protocol = 'http'; // Change protocol to HTTP
  url.hostname = 'rue2.dry-ghd.top'; // Does not accept IP addresses. You can use noip.com to bypass this limitation
  url.port = '11111'; // Specify the port you provided: 8080

  // Create a request to the V2Ray server
  let upstream = new Request(url, req);

  // Send the request to the V2Ray server
  const response = await fetch(upstream);

  // Return the response
  return response;
};
