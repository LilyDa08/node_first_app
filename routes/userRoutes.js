module.exports = app => {


  const file_path = "./DB/users.json";
  const jsonfile = require("jsonfile");

  // ---- GET -----

    app.get("/users", (req, res) => {
      console.log("fetching all users");

      // jsonfile reading
      jsonfile.readFile(file_path, function (err, content) {
        // send file contents back to sender
        res.send(content);
      });
    });

  // ---- POST -----
  //// -- 1st Version --
  // app.post("/users/new", (req, res) => {
  //   let email = req.body.email
  //   let username = req.body.username

  //   jsonfile.readFile("./DB/users.json", function (err, content) {

  //     content.push({
  //       email: email,
  //       username: username
  //     });

  //     console.log("added " + email + " to DB");

  //     jsonfile.writeFile("./DB/users.json", content, function (err) {
  //       console.log(err);
  //     });

  //     res.sendStatus(200);
  //   });
  // });


  //// -- 2nd Version = ES6 destructuring --
  app.post("/users/new", (req, res) => {

    let {
      email,
      username
    } = req.body;

    jsonfile.readFile(file_path, function (err, content) {
      content.push({
        email,
        username
      });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  // ---- DELETE -----

  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function (err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + " from DB");
          content.pop(i);
        }
      }
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });
      res.sendStatus(200);
    });
  });

  // ---- PUT -----

  app.put("/users", (req, res) => {
    let user;
    let username = req.body.username;

    // ADD EMAIL AS A PARAMETER
    // let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {

          console.log("updated user " + req.query.email + " has now username : " + username);

          user = content[i];
          user.username = username;
        }
      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

    });
    res.send(user);
  });

  // ---- Other GET route ??? ----

  app.get("/users", (req, res) => {
    let user;
    let email = req.query.email;

    jsonfile.readFile(file_path, function (err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("found user " + content[i]);
          console.log(content[i]);
          user = content[i];
        }
      }

      res.send(user);
    });
  });

}