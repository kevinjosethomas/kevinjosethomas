import app from "../src/app.js";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

describe("Routes", () => {

  describe("GET /", () => {

    it("should return the home page", (done) => {
      chai.request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    })

  })

  describe("GET /projects", () => {

    it("should return the projects page", (done) => {
      chai.request(app)
      .get("/projects")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    })

  })

  describe("GET /awards", () => {

    it("should return the awards page", (done) => {
      chai.request(app)
      .get("/awards")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    })

  })

  describe("GET /socials", () => {

    it("should return the socials page", (done) => {
      chai.request(app)
      .get("/socials")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    })

  })

})
