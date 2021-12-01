module.exports = app => {
    // const { validateAdmin } = app.config.validateTokenAdmin

    app.get("/", (req, res) => {return res.status(200).json("Backend executando!")})
    app.route("/admin").post( app.api.admin.post)
    app.route("/login").post(app.api.adminAuth.signIn)
    app.get("/childBirth/:id",  app.api.childBirth.get)

    app.route("/address")
        .get( app.api.address.get)
        .post( app.api.address.post)

    app.route("/address/:id")
        .get( app.api.address.getById)
        .delete( app.api.address.remove)

    app.route("/donor")
        .get( app.api.donor.get)
        .post( app.api.donor.post)

    app.route("/donor/:id")
        .get( app.api.donor.getById)
        .delete( app.api.donor.remove)
        .put( app.api.donor.put)

    app.route("/beneficiary")
        .get( app.api.beneficiary.get)
        .post( app.api.beneficiary.post)

    app.route("/beneficiary/:id")
        .get( app.api.beneficiary.getById)
        .delete( app.api.beneficiary.remove)
        .put( app.api.beneficiary.put)

    app.route("/prenatal")
        .get( app.api.prenatal.get)
        .post( app.api.prenatal.post)

    app.route("/prenatal/:id")
        .get( app.api.prenatal.getById)
        .delete( app.api.prenatal.remove)

    app.route("/postnatal")
        .get( app.api.postnatal.get)
        .post( app.api.postnatal.post)

    app.route("/postnatal/:id")
        .get( app.api.postnatal.getById)
        .delete( app.api.postnatal.remove)

    app.route("/obstetrician")
        .get( app.api.obstetrician.get)
        .post( app.api.obstetrician.post)

    app.route("/obstetrician/:id")
        .get( app.api.obstetrician.getById)
        .delete( app.api.obstetrician.remove)

    app.route("/donation")
        .get( app.api.donation.get)
        .post( app.api.donation.post)

    app.route("/donation/:id")
        .get( app.api.donation.getById)
        .delete( app.api.donation.remove)
        .put( app.api.donation.put)

    app.route("/stock")
        .get( app.api.stock.get)
        .post( app.api.stock.post)

    app.route("/stock/:id")
        .get( app.api.stock.getById)
        .delete( app.api.stock.remove)
        .put( app.api.stock.put)  
}