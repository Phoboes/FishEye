

const filterIP = ( req ) => {

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }

  return ip;
}

exports.show = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  const ip = filterIP(req);

  res.json({
      status: "success",
      data: ip
  });
};

exports.filterIP = filterIP;