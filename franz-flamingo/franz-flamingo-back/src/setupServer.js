const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = require("./graphql/schema");
const { authenticate } = require("./middleware/auth");
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const { File } = require("./models");
const { Ringtone } = require("./models");

const {
  createDownload,
  getDownloadFilePath,
  deleteDownload,
} = require("./others/downloadAdmin");
const { response } = require("express");

const serverSetUp = async () => {
  const server = express();
  middleWares(server);
  setupRingtoneUp(server);
  await startServer(server);
};

const middleWares = async (server) => {
  server.use(cors());
  server.use(cookieParser());
  //server.use(express.json());
  server.use(morgan("dev"));
  /*
  server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }),(req, res, next));
  */
  server.use(authenticate);

  server.use("/graphql", (req, res) => {
    return graphqlHTTP({
      schema,
      graphiql: true, // or whatever you want
      context: { req, res },
    })(req, res);
  });
};

const setupRingtoneUp = async (server) => {
  const ringtoneUpload = multer({
    dest: "resources/ringtones",
  });
  // @TODO Add routes
  // Ringtone Upload Routes
  server.post("/ringtone", ringtoneUpload.single("ringtone"), (req, res) => {
    if (!req.verifiedUser) {
      res.json({ success: false, name: "Unauthorized" });
      throw new Error("Unauthorized");
    }
    console.log("-----------", req);
    console.log(req.file);
    //res.json('/ringtone api');
    const veriUser = req.verifiedUser || "";

    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
    const FileAdd = new File({ filename, filepath, mimetype, size });
    const result = FileAdd.save();

    console.log("Si se guardooooo :D", FileAdd._id.toString());

    const pubName = makeRandom(32);
    const rngArgs = {
      title: req.body.title,
      desc: req.body.desc,
      link: pubName,
      owner: veriUser,
      downloads: "0",
      file_id: FileAdd._id.toString(),
    };

    const RingtoneAdd = new Ringtone(rngArgs);
    const resultRng = RingtoneAdd.save();
    res.json({ success: result, name: FileAdd._id.toString() });
  });
  
  server.get("/ringtone/:filename", (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, "ringtones/" + filename);
    return res.sendFile(fullfilepath);
  });

  server.get("/download/:filelink", async function (req, res, next) {
    const { filelink } = req.params;
    const RingtoneSel = await Ringtone.findOne({ link: filelink }, "file_id");
    const FileSel = await File.findById(RingtoneSel.file_id);
    console.log(
      "####################",
      RingtoneSel.file_id,
      "###################"
    );
    console.log(RingtoneSel, "SEPARANDING", FileSel);
    // Get the download sid
    //var downloadSid = req.query.sid;
    var downloadSid;
    createDownload(
      path.join("resources/ringtones/", FileSel.filename),
      function (err, ssid) {
        //console.log(err);
        downloadSid = ssid;
        console.log(downloadSid);
        // ...
        // Get the download file path
        getDownloadFilePath(downloadSid, function (err, data) {
          if (err) return res.end(err);

          // Read and send the file here...
          const dirname = path.resolve();
          const fullfilepath = path.join(dirname, data);
          //res.type("ringtone/png").sendFile(fullfilepath);
          //res.type('ringtone/png');
          res.download(fullfilepath, "rng.mp3", function (err) {
            if (err) {
              // Handle error, but keep in mind the response may be partially-sent
              // so check res.headersSent
              console.log("AWA DE UWU", err);
            } else {
              // decrement a download credit, etc.
              console.log("DESCARGA EXISTOSA");
            }
          });
          // Finally, delete the download session to invalidate the link
          deleteDownload(downloadSid, function (err) {
            // ...
          });
        });
      }
    );
    //console.log( downloadSid);
  });
  //console.log("LA MAMA DE LA MAMA DE LA MAMA", path.join(__dirname, 'public'))
  server.use("/static", express.static(path.join("resources/", "public")));
};


const makeRandom = (
  lengthOfCode,
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890qwertyuiopasdfghjklzxcvbnm"
) => {
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const startServer = async (server) => {
  try {
    const httpServer = new http.createServer(server);
    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port http://172.24.0.3:${process.env.PORT || 4000}/graphql`);
    });
  } catch (error) {
    console.log(error);
    return error;
  }
} 

module.exports = { serverSetUp };
